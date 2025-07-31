"use client";

import { Icons } from "@/lib/icons";
import { MAX_FILE_SIZE, TradeSchema } from "@/lib/validations/trade-schema";
import { useCallback } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Input } from "../ui/input";

interface CreateTradeUploadFile {
  register: UseFormRegister<TradeSchema>;
  setValue: UseFormSetValue<TradeSchema>;
  preview: string | null;
  setPreview: (url: string) => void;
}

const CreateTradeUploadFile = ({
  register,
  setValue,
  preview,
  setPreview,
}: CreateTradeUploadFile) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    },
    [setPreview]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  });

  return (
    <>
      {preview && (
        <Image
          alt=""
          height={200}
          width={400}
          src={preview}
          className="mb-5 object-contain rounded-lg"
        />
      )}
      <div
        {...getRootProps()}
        className="min-h-[200px] border-dashed border-2 rounded-lg border-gray-200 flex flex-col items-center text-center justify-center cursor-pointer hover:bg-gray-100"
      >
        <Input
          type="file"
          {...getInputProps()}
          {...getInputProps()}
          {...register("screenshot")}
          accept="image/jpeg,image/jpg,image/png,image/webp"
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
        <div className="text-sm py-2">
          <span className="font-bold">Click to upload image</span>{" "}
          <p>or drag and drop image here</p>
        </div>
        <p className="text-sm">Maximum file size: 2mb</p>
        <p className="text-xs italic">.jpeg, .jpg, .png, .webp</p>
      </div>
    </>
  );
};

export default CreateTradeUploadFile;
