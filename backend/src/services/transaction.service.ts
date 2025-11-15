import TransactionModel, { TransactionTypeEnum } from "../models/transaction.model";
import { BadRequestException, NotFoundException } from "../utils/app-error";
import { calculateNextOccurrence } from "../utils/helper";
import { CreateTransactionType, UpdateTransactionType } from "../validators/transaction.validator";
import { createUserContent, receiptPrompt, createPartFromBase64 } from "../utils/prompt";
 // ✅ must come before using genAI

// ✅ Initialize Gemini Model (after import)

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Env } from "../config/env.config";
const genAI = new GoogleGenerativeAI(Env.GEMINI_API_KEY);
export const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });



// ✅ Create transaction 
export const createTransactionService = async (body: CreateTransactionType, userId: string) => {
  let nextRecurringDate: Date | undefined;
  const currentDate = new Date();

  if (body.isRecurring && body.recurringInterval) {
    const calculatedDate = calculateNextOccurrence(body.date, body.recurringInterval);
    nextRecurringDate =
      calculatedDate < currentDate
        ? calculateNextOccurrence(currentDate, body.recurringInterval)
        : calculatedDate;
  }

  const transaction = await TransactionModel.create({
    ...body,
    userId,
    amount: Number(body.amount),
    isRecurring: body.isRecurring || false,
    recurringInterval: body.recurringInterval || null,
    nextRecurringDate,
    lastProcessed: null,
  });

  return transaction;
};

// ✅ Get all transactions for logged-in user
export const getAllTransactionService = async (
  userId: string,
  filters: {
    keyword?: string;
    type?: keyof typeof TransactionTypeEnum;
    recurringStatus?: "RECURRING" | "NON_RECURRING";
  },
  pagination: {
    pageSize: number;
    pageNumber: number;
  }
) => {
  const { keyword, type, recurringStatus } = filters;
  const filterConditions: Record<string, any> = { userId };

  if (keyword) {
    filterConditions.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } },
    ];
  }

  if (type) filterConditions.type = type;
  if (recurringStatus) filterConditions.isRecurring = recurringStatus === "RECURRING";

  const { pageSize, pageNumber } = pagination;
  const skip = (pageNumber - 1) * pageSize;

  const [transactions, totalCount] = await Promise.all([
    TransactionModel.find(filterConditions)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 }),
    TransactionModel.countDocuments(filterConditions),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    transactions,
    pagination: {
      pageSize,
      pageNumber,
      totalCount,
      totalPages,
      skip,
    },
  };
};

// ✅ Get single transaction
export const getTransactionByIdService = async (userId: string, transactionId: string) => {
  const transaction = await TransactionModel.findOne({ _id: transactionId, userId });
  if (!transaction) throw new NotFoundException("Transaction not found");
  return transaction;
};

// ✅ Duplicate transaction
export const duplicateTransactionService = async (userId: string, transactionId: string) => {
  const transaction = await TransactionModel.findOne({ _id: transactionId, userId });
  if (!transaction) throw new NotFoundException("Transaction not found");

  const duplicated = await TransactionModel.create({
    ...transaction.toObject(),
    _id: undefined,
    title: `Duplicate - ${transaction.title}`,
    description: transaction.description
      ? `${transaction.description} (Duplicate)`
      : "Duplicated transaction",
    isRecurring: false,
    recurringInterval: undefined,
    nextRecurringDate: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  });

  return duplicated;
};

// ✅ Update transaction
export const updateTransactionService = async (
  userId: string,
  transactionId: string,
  body: UpdateTransactionType
) => {
  const existingTransaction = await TransactionModel.findOne({ _id: transactionId, userId });
  if (!existingTransaction) throw new NotFoundException("Transaction not found");

  const now = new Date();
  const isRecurring = body.isRecurring ?? existingTransaction.isRecurring;
  const date = body.date !== undefined ? new Date(body.date) : existingTransaction.date;
  const recurringInterval = body.recurringInterval || existingTransaction.recurringInterval;

  let nextRecurringDate: Date | undefined;
  if (isRecurring && recurringInterval) {
    const calculatedDate = calculateNextOccurrence(date, recurringInterval);
    nextRecurringDate =
      calculatedDate < now
        ? calculateNextOccurrence(now, recurringInterval)
        : calculatedDate;
  }

  existingTransaction.set({
    ...(body.title && { title: body.title }),
    ...(body.description && { description: body.description }),
    ...(body.category && { category: body.category }),
    ...(body.type && { type: body.type }),
    ...(body.paymentMethod && { paymentMethod: body.paymentMethod }),
    ...(body.amount !== undefined && { amount: Number(body.amount) }),
    isRecurring,
    recurringInterval,
    nextRecurringDate,
  });

  await existingTransaction.save();
  return;
};

// ✅ Delete single transaction
export const deleteTransactionService = async (userId: string, transactionId: string) => {
  const deleted = await TransactionModel.findByIdAndDelete({ _id: transactionId, userId });
  if (!deleted) throw new NotFoundException("Transaction not found");
  return;
};

// ✅ Bulk delete
export const bulkDeleteTransactionService = async (userId: string, transactionIds: string[]) => {
  const result = await TransactionModel.deleteMany({ _id: { $in: transactionIds }, userId });
  if (result.deletedCount === 0) throw new NotFoundException("No transactions found");
  return { success: true, deletedCount: result.deletedCount };
};

// ✅ Bulk upload
export const bulkTransactionService = async (userId: string, transactions: CreateTransactionType[]) => {
  const bulkOps = transactions.map((tx) => ({
    insertOne: {
      document: {
        ...tx,
        userId,
        isRecurring: false,
        nextRecurringDate: null,
        recurringInterval: null,
        lastProcessed: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  }));

  const result = await TransactionModel.bulkWrite(bulkOps, { ordered: true });
  return { insertedCount: result.insertedCount, success: true };
};

// ✅ Gemini Receipt Scanner (Fixed)
export const scanReceiptService = async (file: Express.Multer.File | undefined) => {
  console.log("Uploaded file object:", file);
  
  if (!file) throw new BadRequestException("No file uploaded");

  try {
    // If you are using Cloudinary storage via the multer-storage-cloudinary, file.path (or file.location)
    // will be a public URL already. Confirm with console.log(file).
    const imageUrl = (file as any).path || (file as any).location || (file as any).url || file.originalname;

    if (!imageUrl) {
      // If file.path isn't a URL (e.g. local file), you can upload it to Cloudinary here, or
      // fallback to converting to base64 and using inline approach (more fragile).
      throw new BadRequestException("Uploaded file missing public URL. Ensure Cloudinary storage is used.");
    }

    // Build a prompt that includes the image URL and asks specifically for JSON output
    const prompt = `
You are a helpful financial assistant. Analyze the receipt image at the URL below and extract the transaction details.
Return only valid JSON (no explanation, no code fences) matching this format:

{
  "title": "string",
  "amount": number,
  "date": "YYYY-MM-DD",
  "description": "string",
  "category": "string",
  "paymentMethod": "string",
  "type": "EXPENSE"
}

If it's not a receipt or you can't find a field, omit that field or return {}.

Receipt image URL: ${imageUrl}
`;

    // Call the Gemini model with a plain text prompt (avoids inline image parts issues)
    const result = await geminiModel.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      // Optional: you can set generation config; keep minimal for now
      // generationConfig: { responseMimeType: "application/json" },
    });

    // SDK response handling
    const response = result.response;
    const text = await response.text();

    // Clean Markdown/code block wrappers and parse JSON
    const cleanedText = text?.replace(/```(?:json)?\n?/g, "").trim();
    if (!cleanedText) return { error: "Could not read receipt content" };

    let data;
    try {
      data = JSON.parse(cleanedText);
      if (typeof data.amount === "string") {
    data.amount = data.amount.replace(/\$/g, "₹");
  }
    } catch (err) {
      console.error("Gemini returned non-JSON:", cleanedText);
      return { error: "Invalid response format from Gemini" };
    }

    if (!data.amount || !data.date) {
      return { error: "Receipt missing required information" };
    }

    return {
      title: data.title || "Receipt",
      amount: data.amount,
      date: data.date,
      description: data.description,
      category: data.category,
      paymentMethod: data.paymentMethod,
      type: data.type || "EXPENSE",
      receiptUrl: imageUrl,
    };
  } catch (error: any) {
    console.error("Gemini Receipt Error:", error);
    // If quota error show friendly message (optional)
    if (error?.status === 429) return { error: "Quota exceeded, try again later" };
    return { error: "Receipt scanning service unavailable" };
  }
};
