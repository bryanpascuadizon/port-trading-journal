import { Icons } from "@/lib/icons";

const CreateTradeUploadFile = () => {
  return (
    <div className="min-h-[200px] border-dashed border-2 rounded-lg border-gray-200 flex flex-col items-center text-center justify-center cursor-pointer hover:bg-gray-100">
      <Icons.upload className="w-15 h-15" />
      <div className="text-sm py-2">
        <span className="font-bold">Click to upload image</span>{" "}
        <p>or drag and drop image here</p>
      </div>
      <p className="text-sm">Maximum file size: 10mb</p>
    </div>
  );
};

export default CreateTradeUploadFile;
