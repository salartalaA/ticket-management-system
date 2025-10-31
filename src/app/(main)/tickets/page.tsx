import TicketsComponent from "@/components/tickets/Tickets";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تیکت‌های ثبت شده",
};

export default function TicketsPage() {
  return <TicketsComponent />;
}
