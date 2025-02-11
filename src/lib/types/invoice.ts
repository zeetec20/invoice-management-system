import { z } from "zod";
import { invoiceSchema } from "../schema/invoice";

export type IInvoice = z.infer<typeof invoiceSchema>;

export enum InvoiceStatus {
  Pending = "Pending",
  Unpaid = "Unpaid",
  Paid = "Paid",
}
