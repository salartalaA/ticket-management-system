"use client";

import { signup } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const errorMessages: Record<string, string> = {
  "Email already exists!": "این ایمیل قبلا ثبت شده است",
  "Unknown error": "خطای ناشناخته‌ای رخ داده است",
};

export default function useSignup() {
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("ثبت نام شما با موفقیت انجام شد");
      router.push("/login");
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

  return { isPending, error, signupMutation: mutate };
}
