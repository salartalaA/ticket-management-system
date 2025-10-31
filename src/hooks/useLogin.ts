"use client";

import { login } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const errorMessages: Record<string, string> = {
  "Invalid credentials": "اطلاعات وارد شده اشتباه است",
  "Unknown error": "خطای ناشناخته‌ای رخ داده است",
};

export default function useLogin() {

  const router = useRouter()

  const { mutate, error, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("ورود شما با موفقیت انجام شد");
      router.push('/tickets')
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

  return { error, isPending, loginMutation: mutate };
}
