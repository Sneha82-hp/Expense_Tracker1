import mongoose from "mongoose";
import TransactionModel from "../../models/transaction.model";
import { calculateNextOccurrence } from "../../utils/helper";

export const processRecurringTransactions = async () => {
  const now = new Date();
  let processedCount = 0;
  let failedCount = 0;

  try {
    const transactionCursor = TransactionModel.find({
      isRecurring: true,
      nextRecurringDate: { $lte: now },
    }).cursor();

    console.log("Starting recurring process");

    let found = false;

    for await (const tx of transactionCursor) {
      found = true;
      console.log(`➡️ Processing: ${tx.title} (${tx._id}) for user ${tx.userId}`);
      console.log(`   Current recurring date: ${tx.nextRecurringDate}`);

      const nextDate = calculateNextOccurrence(
        tx.nextRecurringDate!,
        tx.recurringInterval!
      );

      const session = await mongoose.startSession();
      try {
        await session.withTransaction(
          async () => {
            await TransactionModel.create(
              [
                {
                  ...tx.toObject(),
                  _id: new mongoose.Types.ObjectId(),
                  title: `Recurring - ${tx.title}`,
                  date: tx.nextRecurringDate,
                  isRecurring: false,
                  nextRecurringDate: null,
                  recurringInterval: null,
                  lastProcessed: null,
                  createdAt: undefined,
                  updatedAt: undefined,
                },
              ],
              { session }
            );

            await TransactionModel.updateOne(
              { _id: tx._id },
              {
                $set: {
                  nextRecurringDate: nextDate,
                  lastProcessed: now,
                },
              },
              { session }
            );

            console.log(`✅ Created recurring entry: Recurring - ${tx.title}`);
            console.log(`   Next recurring date set to: ${nextDate}`);
             console.log("transaction", {
      _id: tx._id,
      userId: tx.userId,
      title: tx.title,
      type: tx.type,
      amount: tx.amount,
      category: tx.category,
      date: tx.date,
      isRecurring: tx.isRecurring,
      recurringInterval: tx.recurringInterval,
      nextRecurringDate: tx.nextRecurringDate,
      lastProcessed: tx.lastProcessed,
      status: tx.status,
      paymentMethod: tx.paymentMethod,
      createdAt: tx.createdAt,
      updatedAt: tx.updatedAt,
      __v: tx.__v,
    });
          },
          {
            maxCommitTimeMS: 20000,
          }
        );

        processedCount++;
      } catch (error: any) {
        failedCount++;
        console.log(`❌ Failed recurring tx: ${tx._id}`, error);
      } finally {
        await session.endSession();
      }
    }

    if (!found) {
      console.log("ℹ️ No recurring transactions due at this time.");
    }

    console.log(`✅Processed: ${processedCount} transaction`);
    console.log(`❌ Failed: ${failedCount} transaction`);
    console.log("All transactions completed.");

    return {
      success: true,
      processedCount,
      failedCount,
    };
  } catch (error: any) {
    console.error("Error occurred while processing recurring transactions", error);

    return {
      success: false,
      error: error?.message,
    };
  }
};
