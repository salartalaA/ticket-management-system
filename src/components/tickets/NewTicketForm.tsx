"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import FileUploader from "./FileUploader";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const ticketSchema = z.object({
  title: z.string().min(1, "عنوان تیکت را وارد کنید"),
  department: z.enum(
    ["technical", "sales", "support"],
    "دپارتمان مد نظر خود را انتخاب کنید"
  ),
  description: z.string().optional(),
  file: z.instanceof(File).nullable().optional(),
});

type TicketFormData = z.infer<typeof ticketSchema>;

export default function NewTicketForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TicketFormData>({ resolver: zodResolver(ticketSchema) });

  const [isPending, setIsPending] = useState(false);

  const onSubmit = () => {
    setIsPending(true);
    redirect("/tickets");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>ساخت تیکت جدید</CardTitle>
          <CardDescription>
            در صورتی که برای استفاده از خدمات ما دچار مشکل شدید، می‌توانید از
            طریق فرم زیر تیکت ثبت کنید تا در اسرع وقت پیگیری کنیم.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex gap-4">
                <Field>
                  <FieldLabel htmlFor="title">عنوان تیکت</FieldLabel>
                  <Input
                    {...register("title")}
                    id="title"
                    type="text"
                    className="text-sm"
                    placeholder="مشکل در پرداخت آنلاین"
                  />
                  {errors.title && (
                    <p className="text-error">{errors.title.message}</p>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="department">انتخاب دپارتمان</FieldLabel>
                  <Controller
                    control={control}
                    name="department"
                    render={({ field }) => (
                      <Select
                        {...field}
                        dir="rtl"
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[180px]" id="department">
                          <SelectValue placeholder="دپارتمان" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">فنی</SelectItem>
                          <SelectItem value="sales">فروش</SelectItem>
                          <SelectItem value="support">پشتیبانی</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.department && (
                    <p className="text-error">{errors.department.message}</p>
                  )}
                </Field>
              </div>

              {/* This allows file uploader to communicate with our form */}
              <Controller
                control={control}
                name="file"
                render={({ field }) => (
                  <FileUploader
                    value={field.value ?? null}
                    onChange={field.onChange}
                  />
                )}
              />
              <Field>
                <FieldLabel htmlFor="descriptions">توضیحات</FieldLabel>
                <Textarea
                  {...register("description")}
                  id="descriptions"
                  placeholder="توضیحات بیشتر را می‌توانید در اینجا بنویسید ..."
                  className="h-24 text-sm"
                />
              </Field>
            </FieldGroup>

            <Button type="submit" className="w-full mt-5" disabled={isPending}>
              {isPending ? (
                <Loader2 className="animate-spin size-5" />
              ) : (
                "ثبت تیکت"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
