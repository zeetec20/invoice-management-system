import { IInvoice, InvoiceStatus } from "@/lib/types/invoice";
import { formatNumberCurrency } from "@/utils/number";
import dayjs from "dayjs";
import { useState } from "react";
import { useCookies } from "react-cookie";

export const useInvoice = () => {
  const [cookies, setCookie] = useCookies(["invoices"]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<InvoiceStatus | "">("");
  const [search, setSearch] = useState<string>("");
  const invoices: IInvoice[] = cookies.invoices || [];

  const create = async (data: IInvoice) => {
    data.number = `INV${data.number}`;

    // NOTE: Added a promise to introduce a delay, ensuring the user notices that a process is happening.
    return new Promise((resolved, reject) => {
      setIsLoading(true);
      setTimeout(() => {
        try {
          invoices.push(data);
          setCookie("invoices", invoices);

          setIsLoading(false);
          resolved(invoices);
        } catch (err) {
          setIsLoading(false);
          reject(err);
        }
      }, 300);
    });
  };

  const setStatus = (index: number, status: InvoiceStatus) => {
    invoices[index].status = status;
    setCookie("invoices", invoices);
  };

  const remove = (index: number) => {
    setCookie(
      "invoices",
      invoices.filter((_, i) => i !== index)
    );
  };
  const searchLowercase = search.toLowerCase();

  return {
    isLoading,
    create,
    invoices: invoices.filter((invoice) => {
      return (
        (filter === "" ? true : invoice.status === filter) &&
        (invoice.name.toLowerCase().includes(searchLowercase) ||
          invoice.number.includes(searchLowercase) ||
          dayjs(invoice.dueDate)
            .format("MMM D, YYYY")
            .toLowerCase()
            .includes(searchLowercase) ||
          formatNumberCurrency(invoice.amount).includes(searchLowercase))
      );
    }),
    filter,
    setFilter,
    setStatus,
    search,
    setSearch,
    remove,
  };
};
