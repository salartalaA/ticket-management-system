// "use client";

// import * as React from "react";
// import { Calendar } from "@/components/ui/calendar";
// import { DateRange } from "react-day-picker";
// import moment from "moment-jalaali";
// import { Table } from "@tanstack/react-table";
// import { toPersianDigits } from "@/lib/utils";

// // Persian words for calendar days
// const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
// // Months in jalaali
// const persianMonths = [
//   "فروردین",
//   "اردیبهشت",
//   "خرداد",
//   "تیر",
//   "مرداد",
//   "شهریور",
//   "مهر",
//   "آبان",
//   "آذر",
//   "دی",
//   "بهمن",
//   "اسفند",
// ];

// interface DatePickerProps<TData> {
//   table: Table<TData>;
// }

// export function DatePicker<TData>({ table }: DatePickerProps<TData>) {
//   const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
//   const today = new Date();

//   return (
//     <div className="p-2 text-right mx-6 mt-3">
//       <Calendar
//         dir="rtl"
//         mode="range"
//         selected={dateRange}
//         onSelect={(range) => {
//           if (!range) return;

//           const from = range.from ? new Date(range.from) : undefined;
//           const to = range.to ? new Date(range.to) : undefined;

//           setDateRange({ from, to });

//           if (from && to) {
//             table.getColumn("createdAt")?.setFilterValue({ from, to });
//           } else {
//             table.getColumn("createdAt")?.setFilterValue(undefined);
//           }
//         }}
//         numberOfMonths={2}
//         className="rounded-md border"
//         // This makes labels persian
//         formatters={{
//           formatWeekdayName: (day) => weekDays[day.getDay()],
//           formatCaption: (createdAt) => {
//             const m = moment(createdAt);
//             const year = toPersianDigits(m.jYear());
//             const month = persianMonths[m.jMonth()];
//             return `${month} ${year}`;
//           },
//           formatDay: (day) => toPersianDigits(day.getDate()),
//         }}
//         fromMonth={new Date(today.getFullYear() - 1, 0)}
//         toMonth={new Date(today.getFullYear() + 1, 11)}
//       />

//       {dateRange?.from && dateRange?.to && (
//         <div className="text-sm mt-2 text-center text-muted-foreground">
//           از {toPersianDigits(moment(dateRange.from).format("jYYYY/jMM/jDD"))}{" "}
//           تا {toPersianDigits(moment(dateRange.to).format("jYYYY/jMM/jDD"))}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import moment from "moment-jalaali";
import { Table } from "@tanstack/react-table";
import { toPersianDigits } from "@/lib/utils";

moment.loadPersian({ dialect: "persian-modern" });

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

interface DatePickerProps<TData> {
  table: Table<TData>;
}

export function DatePicker<TData>({ table }: DatePickerProps<TData>) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

  const today = moment(); // امروز شمسی

  return (
    <div className="p-2 text-right mx-6 mt-3">
      <Calendar
        dir="rtl"
        mode="range"
        selected={dateRange}
        onSelect={(range) => {
          if (!range?.from || !range?.to) {
            setDateRange(undefined);
            table.getColumn("createdAt")?.setFilterValue(undefined);
            return;
          }

          // تاریخ‌های تقویم میلادی هستن؛ باید به شمسی برگردونیم
          const from = moment(range.from).startOf("day");
          const to = moment(range.to).endOf("day");

          // تبدیل به Date میلادی برای فیلتر (چون دیتابیس میلادیه)
          const fromDate = from.toDate();
          const toDate = to.toDate();

          setDateRange({ from: fromDate, to: toDate });
          table
            .getColumn("createdAt")
            ?.setFilterValue({ from: fromDate, to: toDate });
        }}
        numberOfMonths={2}
        className="rounded-md border"
        formatters={{
          formatWeekdayName: (day) => weekDays[day.getDay()],
          formatCaption: (createdAt) => {
            const m = moment(createdAt);
            const year = toPersianDigits(m.jYear());
            const month = persianMonths[m.jMonth()];
            return `${month} ${year}`;
          },
          formatDay: (day) => {
            const m = moment(day);
            return toPersianDigits(m.jDate());
          },
        }}
        fromMonth={moment(today).subtract(1, "year").toDate()}
        toMonth={moment(today).add(1, "year").toDate()}
      />

      {dateRange?.from && dateRange?.to && (
        <div className="text-sm mt-2 text-center text-muted-foreground">
          از {toPersianDigits(moment(dateRange.from).format("jYYYY/jMM/jDD"))}{" "}
          تا {toPersianDigits(moment(dateRange.to).format("jYYYY/jMM/jDD"))}
        </div>
      )}
    </div>
  );
}
