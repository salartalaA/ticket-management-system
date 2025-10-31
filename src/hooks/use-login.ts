"use client";

import { login } from "@/lib/api";
import { errorMessages } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useLogin() {
  const router = useRouter();

  const result = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("خوش آمدید");
      router.push("/tickets");
    },

    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const englishMessage = error.response?.data?.message || "Unknown error";
        const message = errorMessages[englishMessage] || englishMessage;
        toast.error(message);
      } else if (error instanceof Error) {
        // translate those errors coming from signIn (Next Auth)
        const message = errorMessages[error.message] || error.message;
        toast.error(message);
      } else {
        toast.error("مشکلی پیش آمده است.");
      }
    },
  });

  return result;
}
