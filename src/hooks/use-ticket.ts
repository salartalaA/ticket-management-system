"use client";

import { createTicket } from "@/lib/actions/create-ticket";
import { tickets } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

  const queryClient = useQueryClient()

  const result = useMutation({
    mutationFn: ({ data }: { data: CreateTicketData }) => createTicket(data),
    onSuccess: () => {
      toast.success("تیکت شما ایجاد شد");
      router.push("/tickets");
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: () => {
      toast.error("خطای ناشناخته");
    },
  });

  return result;
}

export function useGetTickets() {
  const result = useQuery({ queryKey: ["tickets"], queryFn: tickets });

  return result;
}
