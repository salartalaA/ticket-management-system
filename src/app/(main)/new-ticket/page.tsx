import NewTicketForm from "@/components/tickets/NewTicketForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ایجاد تیکت جدید",
};


export default function NewTicketPage() {
  return <NewTicketForm className="max-w-xl mx-4 md:mx-auto my-5" dir="rtl" />;
}
