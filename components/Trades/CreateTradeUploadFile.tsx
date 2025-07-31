"use client";

import { Icons } from "@/lib/icons";
import { TradeSchema } from "@/lib/validations/trade-schema";
import { useCallback } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Input } from "../ui/input";

interface CreateTradeUploadFile {
  setValue: UseFormSetValue<TradeSchema>;
  screenshot: File;
}

const CreateTradeUploadFile = ({ setValue }: CreateTradeUploadFile) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue("screenshot", file, {
          shouldValidate: true,
        });
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className="min-h-[170px] border-dashed border-2 rounded-lg border-gray-200 flex flex-col items-center text-center justify-center cursor-pointer hover:bg-gray-100"
      >
        <Input
          type="file"
          {...getInputProps()}
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              setValue("screenshot", file, {
                shouldValidate: true,
              });
            }
          }}
        />
        <Icons.upload className="w-15 h-15" />
        <div className="text-xs py-2">
          <span className="font-bold">Click to upload image</span>{" "}
          <p>or drag and drop image here</p>
        </div>
        <p className="text-xs">Maximum file size: 2mb</p>
        <p className="text-xs italic">.jpeg, .jpg, .png, .webp</p>
      </div>
    </>
  );
};

export default CreateTradeUploadFile;
