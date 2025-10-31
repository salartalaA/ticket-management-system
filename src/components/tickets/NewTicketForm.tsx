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
import { Loader2 } from "lucide-react";
import { useCreateTicket } from "@/hooks/use-ticket";
import useUploadFile from "@/hooks/use-uploadfile";
import { toast } from "sonner";

const ticketSchema = z.object({
  title: z.string().min(1, "عنوان تیکت را وارد کنید"),
  department: z.enum(
    ["TECHNICAL", "SALES", "SUPPORT"],
    "دپارتمان مد نظر خود را انتخاب کنید"
  ),
  description: z.string().optional(),
  file: z.instanceof(File).optional(),
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

  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();
  const { isPending, mutate: createTicketMutation } = useCreateTicket();

  const onSubmit = async (data: TicketFormData) => {
    let fileUrl: string | undefined;

    if (data.file) {
      try {
        fileUrl = await uploadFile(data.file);
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("آپلود فایل موفق نبود. تیکت ایجاد نشد.");
        return;
      }
    }

    createTicketMutation({
      data: {
        title: data.title,
        department: data.department,
        description: data.description,
        fileUrl,
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>ساخت تیکت جدید</CardTitle>
          <CardDescription>
            برای مشکلات خود تیکت ثبت کنید تا بررسی شود.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex gap-4">
                <Field>
                  <FieldLabel htmlFor="title">عنوان</FieldLabel>
                  <Input
                    {...register("title")}
                    id="title"
                    placeholder="مثال: مشکل پرداخت"
                  />
                  {errors.title && (
                    <p className="text-error">{errors.title.message}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="department">دپارتمان</FieldLabel>
                  <Controller
                    control={control}
                    name="department"
                    render={({ field }) => (
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        dir="rtl"
                      >
                        <SelectTrigger className="w-[180px]" id="department">
                          <SelectValue placeholder="انتخاب کنید" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TECHNICAL">فنی</SelectItem>
                          <SelectItem value="SALES">فروش</SelectItem>
                          <SelectItem value="SUPPORT">پشتیبانی</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.department && (
                    <p className="text-error">{errors.department.message}</p>
                  )}
                </Field>
              </div>

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
                <FieldLabel htmlFor="desc">توضیحات</FieldLabel>
                <Textarea
                  {...register("description")}
                  id="desc"
                  placeholder="توضیحات بیشتر را در اینجا می‌توانید بنویسید ..."
                  className="h-32"
                />
              </Field>
            </FieldGroup>

            <Button
              type="submit"
              className="w-full mt-5"
              disabled={isPending || isUploading}
            >
              {isPending || isUploading ? (
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
