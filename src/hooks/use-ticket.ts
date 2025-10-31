"use client";

import { createTicket } from "@/lib/actions/create-ticket";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateTicketData {
  title: string;
  department: "TECHNICAL" | "SALES" | "SUPPORT";
  description?: string;
  fileUrl?: string;
}

export function useCreateTicket() {
  const router = useRouter();

  const result = useMutation({
    mutationFn: ({ data }: { data: CreateTicketData }) => createTicket(data),
    onSuccess: () => {
      toast.success("تیکت شما ایجاد شد");
      router.push("/tickets");
    },
    onError: () => {
      toast.error("خطای ناشناخته");
    },
  });

  return result;
}
