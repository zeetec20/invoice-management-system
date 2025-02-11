import dayjs from "dayjs";
import { z } from "zod";

export const invoiceSchema = z.object({
  name: z.string().min(1, { message: "Please enter your name" }),
  number: z.string().regex(/^\d+$/, { message: "Please enter your number" }),
  dueDate: z
    .date({ message: "Please enter your due date" })
    .refine((date) => dayjs(date).isAfter(dayjs().subtract(1, "day"), "day"), {
      message: "Please due date must be in the future",
    }),
  amount: z.string().regex(/^\d+$/, { message: "Please enter your amount" }),
  status: z.enum(["Paid", "Unpaid", "Pending"], {
    message: "Please select your status",
  }),
});
