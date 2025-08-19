"use client";

import { Icons } from "@/lib/icons";
import { TradeSchema } from "@/lib/validations/trade-schema";
import { useCallback, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface TradeFormUploadFileFieldProps {
  setValue: UseFormSetValue<TradeSchema>;
  screenshot: File | string;
}

const TradeFormUploadFileField = ({
  setValue,
  screenshot,
}: TradeFormUploadFileFieldProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
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

  const renderImage = () => {
    const imageSource =
      typeof screenshot === "string"
        ? screenshot
        : URL.createObjectURL(screenshot);

    return (
      <Image
        alt="trade_image"
        fill
        src={imageSource}
        className="object-contain rounded-lg z-10"
        onLoadingComplete={() => setImageLoaded(true)}
      />
    );
  };

  return (
    <>
      {screenshot ? (
        <div className="relative">
          <div className="relative h-41 w-full">
            {typeof screenshot === "string" ? (
              <>
                <Link
                  href={screenshot}
                  className="text-sm my-2 text-blue-700"
                  target="_blank"
                >
                  {renderImage()}
                </Link>
                <Skeleton className="h-41 w-full skeleton absolute z-0" />
              </>
            ) : (
              renderImage()
            )}
          </div>

          {imageLoaded && (
            <Button
              className="absolute rounded-full top-[-10px] right-[-10px] z-20 bg-negative hover:bg-negative"
              onClick={() => setValue("screenshot", "")}
            >
              <X />
            </Button>
          )}
        </div>
      ) : (
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
      )}
    </>
  );
};

export default TradeFormUploadFileField;
