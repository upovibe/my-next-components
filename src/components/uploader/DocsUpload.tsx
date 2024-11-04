"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  FaCloudUploadAlt,
  // FaFilePdf,
  FaTimes,
  FaFileAlt,
  FaFileUpload,
} from "react-icons/fa";
import Lottie from "lottie-react";
import uploadingAnimation from "@/assets/animations/Loading.json";
import Tooltip from "@/components/basics/Tooltip";

interface DocUploadProps {
  onFileUpload: (files: File[]) => void;
  maxFiles?: number;
  showSubmit?: boolean;
  showClear?: boolean;
  showUpload?: boolean;
}

const DocUpload: React.FC<DocUploadProps> = ({
  onFileUpload,
  maxFiles = 10,
  showSubmit = false,
  showClear = true,
  showUpload = true,
}) => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<{ file: File; date: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalSize, setTotalSize] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const size = files.reduce((acc, { file }) => acc + file.size, 0);
    setTotalSize(size);
  }, [files]);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFiles = (fileList: FileList | null) => {
    if (fileList) {
      const fileArray = Array.from(fileList);
      const validFiles = fileArray.filter(
        (file) =>
          file.type === "application/pdf" ||
          file.type === "application/msword" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.type === "text/plain"
      );

      if (validFiles.length + files.length > maxFiles) {
        setError(`You can only upload up to ${maxFiles} files.`);
        return;
      }

      if (validFiles.length > 0) {
        setError(null);
        setUploading(true);

        setTimeout(() => {
          const newFiles = validFiles.map((file) => ({
            file,
            date: new Date().toLocaleDateString(),
          }));
          setFiles((prevFiles) => [...prevFiles, ...newFiles]);
          onFileUpload([...files.map((f) => f.file), ...validFiles]);
          setUploading(false);
        }, 2000);
      } else {
        // Show error only if files are invalid
        if (fileArray.length > 0) {
          setError("Only PDF, Word, and text documents are allowed.");
        }
      }
    }
  };

  const cancelFile = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFileUpload(newFiles.map((f) => f.file));
  };

  const clearAllFiles = () => {
    setFiles([]);
    onFileUpload([]);
  };

  const uploadAllFiles = () => {
    setUploading(true);
    setTimeout(() => {
      onFileUpload(files.map((f) => f.file));
      setUploading(false);
    }, 2000);
  };

  const formatFileSize = (size: number) => {
    return size >= 1024 * 1024
      ? `${(size / (1024 * 1024)).toFixed(2)} MB`
      : `${(size / 1024).toFixed(2)} KB`;
  };

  const totalProgress = totalSize > 0 ? (totalSize / (1024 * 1024)) * 100 : 0;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full">
        <div className="flex items-center justify-between gap-2 border-2 rounded-t-md border-b-0 border-border dark:border-coal p-2">
          <div className="flex items-start flex-col gap-1 md:gap-2 md:flex-row-reverse md:items-center">
            <p className="text-soft dark:text-pale text-sm">
              {files.length > 0
                ? `${files.length} document(s) uploaded`
                : "No documents uploaded"}
            </p>
            <div className="flex items-center gap-1">
              {showUpload && (
                <button
                  type="button"
                  className="text-gray-600 border-2 border-border dark:border-coal rounded-full p-2 bg-primary dark:bg-shade hover:text-white hover:bg-highlight dark:hover:bg-ocean transition-all duration-200"
                  onClick={handleClick}
                  title="Upload All Files"
                >
                  <FaCloudUploadAlt />
                </button>
              )}
              {showClear && (
                <button
                  type="button"
                  className="text-red-600 border-2 border-border dark:border-coal rounded-full p-2 hover:text-white bg-primary dark:bg-shade hover:bg-alert dark:hover:bg-crimson transition-all duration-200"
                  onClick={clearAllFiles}
                  title="Clear All Files"
                >
                  <FaTimes />
                </button>
              )}
              {showSubmit && (
                <button
                  aria-label="Submit"
                  type="button"
                  className="text-blue-600 border-2 border-border dark:border-coal rounded-full p-2 bg-primary dark:bg-shade hover:text-white hover:bg-blue-600 transition-all ease-linear duration-200"
                  onClick={uploadAllFiles}
                >
                  <FaFileUpload />
                </button>
              )}
            </div>
          </div>
          <div className="flex items-end flex-col gap-1 md:flex-row-reverse md:gap-2 md:items-center">
            <div className="w-24 bg-tertiary dark:bg-shadow rounded h-2 relative flex-grow overflow-hidden">
              <div
                className="bg-highlight dark:bg-ocean h-full rounded"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
            <p className="text-soft dark:text-pale text-sm">
              {formatFileSize(totalSize)}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full p-4 border-2 border-dashed border-border dark:border-coal text-center relative border-t-0 rounded-b-md">
        <div className="border-t-2 border-solid border-border dark:border-coal absolute top-0 left-0 w-full" />

        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          ref={fileInputRef}
          multiple={maxFiles > 1}
          aria-label="Upload files" // Accessible label
          title="Upload files" // Hover text, also invisible in hidden inputs
        />

        <div
          className="flex flex-col items-center justify-center gap-2 cursor-pointer mb-2"
          onClick={handleClick}
        >
          <FaCloudUploadAlt className="text-soft dark:text-pale" />
          <p className="text-gray-500">
            {uploading ? (
              <Lottie
                className="size-full max-h-20 max-w-20"
                animationData={uploadingAnimation}
                loop
              />
            ) : error ? (
              <span className="text-red-500 text-sm">{error}</span>
            ) : (
              "Drag and drop files or browse your computer"
            )}
          </p>
        </div>

        {files.length > 0 && (
          <div
            onClick={handleClick}
            className="w-full flex items-start flex-wrap gap-3 cursor-pointer"
          >
            {files.map((item, index) => (
              <div
                key={index}
                className="relative z-50 p-2 border border-border dark:border-coal rounded-md flex justify-between items-center bg-tertiary dark:bg-dim cursor-default"
              >
                <div className="flex items-center flex-col gap-2">
                  <Tooltip
                    mouseTrack
                    content={
                      <>
                        <p className="text-sm">{item.file.name}</p>
                        <p className="text-sm">
                          {formatFileSize(item.file.size)}
                        </p>
                        <p className="text-sm">Uploaded on: {item.date}</p>
                      </>
                    }
                  >
                    <div className="flex flex-col items-center gap-2">
                      <FaFileAlt className="text-gray-500 text-6xl" />
                      <p className="text-xs max-w-20 text-ellipsis overflow-hidden whitespace-nowrap">
                        {item.file.name}
                      </p>
                    </div>
                  </Tooltip>
                  <button
                    aria-label="Cancel file upload"
                    type="button"
                    className="text-red-500 hover:text-red-600 absolute top-0 right-0"
                    onClick={(e) => cancelFile(index, e)}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocUpload;
