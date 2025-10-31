"use client";

import { cn, toPersianDigits } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });

export type Ticket = {
  id: string;
  title: string;
  department: string;
  status: "PENDING" | "ANSWERED";
  createdAt: Date | string;
};

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "title",
    header: () => <div className="text-right">عنوان تیکت</div>,
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "department",
    header: () => <div className="text-right">دپارتمان</div>,
    cell: ({ row }) => {
      const dept = row.getValue("department");
      const deptMap: Record<string, string> = {
        TECHNICAL: "فنی",
        SALES: "فروش",
        SUPPORT: "پشتیبانی",
      };

      return <div className="text-right">{deptMap[dept as string]}</div>;
    },
  },

  {
    accessorKey: "status",
    header: () => <div className="text-right">وضعیت</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as "PENDING" | "ANSWERED";

      const label = status === "PENDING" ? "در حال بررسی" : "پاسخ داده شده";

      return (
        <div
          className={cn(
            "p-1 rounded-md w-max text-xs text-right",
            status === "PENDING" && "bg-yellow-500/60",
            status === "ANSWERED" && "bg-green-500/60"
          )}
        >
          {label}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">تاریخ ثبت</div>,
    cell: ({ row }) => {
      const time = row.getValue("createdAt") as string;
      const jalali = moment(time).format("jYYYY/jMM/jDD");
      return <div className="text-right">{toPersianDigits(jalali)}</div>;
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue?.from || !filterValue?.to) return true;

      const rowDate = new Date(row.getValue(columnId)); // تاریخ از دیتابیس میلادی
      const fromDate = new Date(filterValue.from);
      const toDate = new Date(filterValue.to);

      // اختلاف زمان UTC vs local
      const rowTime = rowDate.getTime();
      const fromTime = fromDate.getTime();
      const toTime = toDate.getTime();

      return rowTime >= fromTime && rowTime <= toTime;
    },
  },
];
