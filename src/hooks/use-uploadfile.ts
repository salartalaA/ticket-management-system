"use client";

import { uploadFile } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export default function useUploadFile() {
  const mutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => toast.success("فایل با موفقیت آپلود شد"),
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "خطا در آپلود فایل";
        toast.error(message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("مشکلی پیش آمده است.");
      }
    },
  });

  return {
    ...mutation,
    mutateAsync: mutation.mutateAsync,
  };
}
