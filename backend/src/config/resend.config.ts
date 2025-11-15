import { Resend } from "resend";
import { Env } from "./env.config";

export const resend = new Resend(process.env.RESEND_API_KEY);