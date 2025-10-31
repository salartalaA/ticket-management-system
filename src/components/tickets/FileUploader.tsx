"use client";

import * as React from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";

interface FileUploaderProps {
  value: File | null;
  onChange: (file: File | null) => void;
}

export default function FileUploader({ value, onChange }: FileUploaderProps) {
  const handleDelete = () => onChange(null);

  return (
    <FileUpload
      maxFiles={1}
      maxSize={5 * 1024 * 1024}
      accept=".pdf,.png,.jpg,.jpeg"
      onAccept={(files) => onChange(files[0] || null)}
      className="w-full"
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <Upload className="size-6 text-muted-foreground" />
          </div>
          <p className="font-medium text-sm">فایل را بکشید یا انتخاب کنید</p>
          <p className="text-muted-foreground text-xs">فقط ۱ فایل</p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            انتخاب فایل
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>

      {value && (
        <FileUploadList>
          <FileUploadItem key={value.name} value={value}>
            <div className="flex w-full items-center gap-2">
              <FileUploadItemPreview />
              <FileUploadItemMetadata />
              <FileUploadItemDelete asChild>
                <Button
                  type="button"
                  onClick={handleDelete}
                  variant="ghost"
                  size="icon"
                  className="size-7"
                >
                  <X />
                </Button>
              </FileUploadItemDelete>
            </div>
            <FileUploadItemProgress />
          </FileUploadItem>
        </FileUploadList>
      )}
    </FileUpload>
  );
}
