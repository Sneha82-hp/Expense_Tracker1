import mongoose from "mongoose";
import ReportModel from "./report.model";

export enum ReportFrequencyEnum{
    DAILY="DAILY",
    WEEKLY="WEEKLY",
    MONTHLY="MONTHLY",
}


export interface ReportSettingDocument extends Document{
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    frequency: keyof typeof ReportFrequencyEnum;
    isEnabled: boolean;
    nextReportDate?: Date;
    lastSentDate?: Date;
    createdAt: Date;
    updatedAt: Date;
 }

 const reportSettingSchema =  new mongoose.Schema<ReportSettingDocument>({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    frequency:{
        type:String,
        enum:Object.values(ReportFrequencyEnum),
        default: ReportFrequencyEnum.MONTHLY,
    },
    isEnabled:{
        type:Boolean,
        default: false,
    },
    nextReportDate:{
        type:Date,
    },
    lastSentDate:{
        type:Date,
    },
 },
{
    timestamps: true
}
);

const ReportSettingModel= mongoose.model<ReportSettingDocument>(
    "ReportSetting",
    reportSettingSchema
);
export default ReportSettingModel;
