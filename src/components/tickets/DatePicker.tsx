"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import moment from "moment-jalaali";
import { Table } from "@tanstack/react-table";
import { toPersianDigits } from "@/lib/utils";

// Persian words for calendar days
const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
// Months in jalaali
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
  const today = new Date();

  return (
    <div className="p-2 text-right mx-6 mt-3">
      <Calendar
        dir="rtl"
        mode="range"
        selected={dateRange}
        onSelect={(range) => {
          setDateRange(range);

          if (range?.from && range?.to) {
            table.getColumn("createdAt")?.setFilterValue({
              from: range.from,
              to: range.to,
            });
          } else {
            table.getColumn("createdAt")?.setFilterValue(undefined);
          }
        }}
        numberOfMonths={2}
        className="rounded-md border"
        // This makes labels persian
        formatters={{
          formatWeekdayName: (day) => weekDays[day.getDay()],
          formatCaption: (createdAt) => {
            const m = moment(createdAt);
            const year = toPersianDigits(m.jYear());
            const month = persianMonths[m.jMonth()];
            return `${month} ${year}`;
          },
          formatDay: (day) => toPersianDigits(day.getDate()),
        }}
        fromMonth={new Date(today.getFullYear() - 1, 0)}
        toMonth={new Date(today.getFullYear() + 1, 11)}
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
