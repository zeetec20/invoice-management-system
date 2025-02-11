import { InvoiceStatus } from "@/lib/types/invoice";

export const STATUS_COLOR = {
  [InvoiceStatus.Paid]: {
    color: "#219653",
    backgroundColor: "#21965314",
  },
  [InvoiceStatus.Unpaid]: {
    color: "#D34053",
    backgroundColor: "#D3405314",
  },
  [InvoiceStatus.Pending]: {
    color: "#FFA70B",
    backgroundColor: "#FFA70B14",
  },
};
