import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// A function that helps to have persian numbers in calendar
export const toPersianDigits = (str: string | number) =>
  str.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);

export const errorMessages: Record<string, string> = {
  "Email already exists!": "این ایمیل قبلا ثبت شده است",
  "Invalid credentials": "اطلاعات وارد شده اشتباه است",
  "Unknown error": "خطای ناشناخته‌ای رخ داده است",
};