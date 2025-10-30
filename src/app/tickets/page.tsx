"use client";

import { columns, Ticket } from "@/components/tickets/Columns";
import { DataTable } from "@/components/tickets/DataTable";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const getData = async (): Promise<Ticket[]> => {
  return [
    {
      id: "tkt001",
      title: "عدم دریافت ایمیل تایید حساب",
      department: "پشتیبانی",
      status: "pending",
      createdAt: "2025-09-12",
    },
    {
      id: "tkt002",
      title: "مشکل در پرداخت آنلاین",
      department: "فروش",
      status: "answered",
      createdAt: "2025-08-21",
    },
    {
      id: "tkt003",
      title: "خطا در ورود به سیستم",
      department: "فنی",
      status: "pending",
      createdAt: "2025-09-30",
    },
    {
      id: "tkt004",
      title: "درخواست بازگشت وجه",
      department: "فروش",
      status: "answered",
      createdAt: "2025-10-01",
    },
    {
      id: "tkt005",
      title: "کندی در بارگذاری صفحات",
      department: "فنی",
      status: "pending",
      createdAt: "2025-07-15",
    },
    {
      id: "tkt006",
      title: "عدم نمایش موجودی کیف پول",
      department: "فنی",
      status: "answered",
      createdAt: "2025-06-09",
    },
    {
      id: "tkt007",
      title: "درخواست تغییر شماره تماس",
      department: "پشتیبانی",
      status: "pending",
      createdAt: "2025-09-02",
    },
    {
      id: "tkt008",
      title: "سفارش ناقص ارسال شده",
      department: "فروش",
      status: "answered",
      createdAt: "2025-09-17",
    },
    {
      id: "tkt009",
      title: "عدم دریافت کد تخفیف",
      department: "پشتیبانی",
      status: "pending",
      createdAt: "2025-10-03",
    },
    {
      id: "tkt010",
      title: "پیشنهاد افزودن حالت شب به سایت",
      department: "فنی",
      status: "answered",
      createdAt: "2025-08-12",
    },
    {
      id: "tkt011",
      title: "خطای 500 هنگام ثبت سفارش",
      department: "فنی",
      status: "pending",
      createdAt: "2025-09-08",
    },
    {
      id: "tkt012",
      title: "درخواست صدور فاکتور رسمی",
      department: "فروش",
      status: "answered",
      createdAt: "2025-07-26",
    },
    {
      id: "tkt013",
      title: "غیرفعال شدن خودکار حساب",
      department: "پشتیبانی",
      status: "pending",
      createdAt: "2025-10-04",
    },
    {
      id: "tkt014",
      title: "به‌روزرسانی اشتباه اطلاعات کاربر",
      department: "فنی",
      status: "answered",
      createdAt: "2025-06-19",
    },
    {
      id: "tkt015",
      title: "عدم تطابق مبلغ پرداختی",
      department: "فروش",
      status: "pending",
      createdAt: "2025-08-25",
    },
    {
      id: "tkt016",
      title: "درخواست تمدید اشتراک",
      department: "پشتیبانی",
      status: "answered",
      createdAt: "2025-09-05",
    },
    {
      id: "tkt017",
      title: "بروز خطا در ارسال فرم تماس",
      department: "فنی",
      status: "pending",
      createdAt: "2025-10-02",
    },
    {
      id: "tkt018",
      title: "لغو سفارش اشتباهی",
      department: "فروش",
      status: "answered",
      createdAt: "2025-09-28",
    },
    {
      id: "tkt019",
      title: "عدم دریافت پیامک تایید پرداخت",
      department: "پشتیبانی",
      status: "pending",
      createdAt: "2025-08-09",
    },
    {
      id: "tkt020",
      title: "پیشنهاد اضافه شدن درگاه جدید",
      department: "فروش",
      status: "answered",
      createdAt: "2025-09-13",
    },
    {
      id: "tkt021",
      title: "کندی سرور در ساعات اوج",
      department: "فنی",
      status: "pending",
      createdAt: "2025-07-29",
    },
    {
      id: "tkt022",
      title: "درخواست تغییر پلن اشتراک",
      department: "فروش",
      status: "answered",
      createdAt: "2025-08-01",
    },
    {
      id: "tkt023",
      title: "عدم هماهنگی در اطلاعات سفارش",
      department: "پشتیبانی",
      status: "pending",
      createdAt: "2025-09-22",
    },
    {
      id: "tkt024",
      title: "درخواست حذف حساب کاربری",
      department: "پشتیبانی",
      status: "answered",
      createdAt: "2025-10-07",
    },
    {
      id: "tkt025",
      title: "مشکل در به‌روزرسانی اپلیکیشن",
      department: "فنی",
      status: "pending",
      createdAt: "2025-09-19",
    },
    {
      id: "tkt026",
      title: "سوال درباره قیمت‌گذاری جدید",
      department: "فروش",
      status: "answered",
      createdAt: "2025-10-06",
    },
  ];
};

export default function NewTicketPage() {
  const [data, setData] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getData().then(setData).then(() => setLoading(false));
  }, []);

  if(loading) return  <Loader2 size={32} className="mx-auto mt-32 animate-spin w-fit" />

  return (
    <div className="max-w-7xl mx-auto mt-5 p-2">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
