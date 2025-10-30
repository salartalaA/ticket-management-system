import { Table } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { DatePicker } from "./DatePicker";
import { Calendar } from "lucide-react";

interface DateDialogProps<TData> {
  table: Table<TData>;
}

export function DateDialog<TData>({ table }: DateDialogProps<TData>) {
  const isDateFiltered = !!table.getColumn("createdAt")?.getFilterValue();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Calendar />
          <span>فیلتر بر اساس تاریخ</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[425px] lg:w-full flex flex-col items-center justify-center">
        <DialogTitle className="sr-only">فیلتر تاریخ</DialogTitle>
        <DatePicker table={table} />
      </DialogContent>

      {isDateFiltered && (
        <Button
          variant="destructive"
          onClick={() => {
            table.getColumn("createdAt")?.setFilterValue(undefined);
          }}
        >
          حذف فیلتر تاریخ
        </Button>
      )}
    </Dialog>
  );
}
