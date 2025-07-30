import React from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onUpload: (file: File) => void;
}

const FileUploader: React.FC<Props> = ({ onUpload }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.length) onUpload(acceptedFiles[0]);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full max-w-xl mx-auto mt-20 p-16 border-2 border-dashed rounded-lg text-center transition
        ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-white"
        }`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        {isDragActive
          ? "Drop the PDF here..."
          : "Drag & drop a PDF here, or click to select"}
      </p>
    </div>
  );
};

export default FileUploader;
