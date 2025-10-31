"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLogin from "@/hooks/use-login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string()
    .nonempty("ایمیل خود را وارد کنید")
    .email("ایمیل معتبر وارد کنید"),
  password: z
    .string()
    .nonempty("رمز عبور خود را وارد کنید")
    .min(6, "رمز عبور می‌بایست حداقل 6 کاراکتر باشد"),
});

type LoginFormData = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(LoginSchema) });

  const { mutate: loginMutation, isPending } = useLogin();

  const onSubmit = (data: LoginFormData) => {
    loginMutation(data);
  };

  return (
    <div className="flex items-center justify-center h-screen" dir="rtl">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-sm">
            برای دسترسی به تیکت‌هایتان، به حساب خود وارد شوید
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">ایمیل شما</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                />
                {errors.email && (
                  <p className="text-error">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">رمزعبور شما</Label>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-error">{errors.password.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="animate-spin size-5" />
                ) : (
                  "ورود"
                )}
              </Button>
              <p className="text-sm mt-2">
                حساب کاربری ندارید؟
                <Link href={"/signup"} className="text-foreground/40">
                  {" ثبت نام "}
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
