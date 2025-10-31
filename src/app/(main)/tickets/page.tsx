"use client";

import { columns } from "@/components/tickets/data-table/Columns";
import { DataTable } from "@/components/tickets/data-table/DataTable";
import { useGetTickets } from "@/hooks/use-ticket";
import { Loader2 } from "lucide-react";

export default function NewTicketPage() {
  const { data, isLoading } = useGetTickets();

  if (isLoading)
    return <Loader2 size={32} className="mx-auto mt-32 animate-spin w-fit" />;

  return (
    <div className="max-w-7xl mx-auto mt-3 p-2">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
