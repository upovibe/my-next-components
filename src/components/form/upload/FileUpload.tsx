"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  FaCloudUploadAlt,
  FaTimes,
  FaFileUpload,
  FaFileAlt,
} from "react-icons/fa";
import Lottie from "lottie-react";
import uploadingAnimation from "@/assets/animation/uploading.json";
import Tooltip from "@/components/common/Tooltip";
import Image from "next/image";

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  maxFiles?: number;
  fileType?: "image" | "video" | "doc" | "all";
  showSubmit?: boolean;
  showClear?: boolean;
  showUpload?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  maxFiles = 10,
  fileType = "image",
  showSubmit = false,
  showClear = true,
  showUpload = true,
}) => {
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState<{
      file: File;
      date: string;
      preview?: string;
    }[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [totalSize, setTotalSize] = useState<number>(0);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const getAcceptedFileTypes = () => {
        switch (fileType) {
          case "image":
            return "image/*";
          case "video":
            return "video/*";
          case "doc":
            return ".pdf,.doc,.docx,.txt";
          case "all":
            return "image/*,video/*,.pdf,.doc,.docx,.txt"; // Allow all file types
          default:
            return "";
        }
      };

  useEffect(() => {
    const size = files.reduce((acc, { file }) => acc + file.size, 0);
    setTotalSize(size);

    // Revoke object URLs when component unmounts to prevent memory leaks
    return () => {
      files.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
    };
  }, [files]);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFiles = (fileList: FileList | null) => {
    if (fileList) {
      const fileArray = Array.from(fileList);
      const validFiles = fileArray.filter((file) => {
        if (fileType === "all") return true;
        if (fileType === "image") return file.type.startsWith("image/");
        if (fileType === "video") return file.type.startsWith("video/");
        return (
          file.type === "application/pdf" ||
          file.type === "application/msword" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.type === "text/plain"
        );
      });

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
            preview:
              fileType === "image" || fileType === "video"
                ? URL.createObjectURL(file)
                : undefined,
          }));
          setFiles((prevFiles) => [...prevFiles, ...newFiles]);
          onFileUpload([...files.map((f) => f.file), ...validFiles]);
          setUploading(false);
        }, 2000);
      } else {
        setError(`Invalid file type. Only ${fileType} files are allowed.`);
      }
    }
  };

  const cancelFile = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const newFiles = [...files];
    if (newFiles[index].preview) URL.revokeObjectURL(newFiles[index].preview!);
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFileUpload(newFiles.map((f) => f.file));
  };

  const clearAllFiles = () => {
    files.forEach((file) => file.preview && URL.revokeObjectURL(file.preview));
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
            <p className="text-sm">
              {files.length > 0 ? `${files.length} file(s) uploaded` : ""}
            </p>
            <div className="flex items-center gap-1">
  {showUpload && (
    <button
      type="button"
      className="text-gray-600 border-2 border-border dark:border-coal rounded-full p-2 bg-primary dark:bg-shade hover:text-white hover:bg-highlight dark:hover:bg-ocean transition-all duration-200"
      onClick={handleClick}
      title="Upload Files"
    >
      <FaCloudUploadAlt aria-label="Upload Files" />
    </button>
  )}
  {showClear && (
    <button
      type="button"
      className="text-red-600 border-2 border-border dark:border-coal rounded-full p-2 hover:text-white bg-primary dark:bg-shade hover:bg-alert dark:hover:bg-crimson transition-all duration-200"
      onClick={clearAllFiles}
      title="Clear All Files"
    >
      <FaTimes aria-label="Clear All Files" />
    </button>
  )}
  {showSubmit && (
    <button
      type="button"
      className="text-blue-600 border-2 border-border dark:border-coal rounded-full p-2 bg-primary dark:bg-shade hover:text-white hover:bg-blue-600 transition-all ease-linear duration-200"
      onClick={uploadAllFiles}
      title="Submit Files"
    >
      <FaFileUpload aria-label="Submit Files" />
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
            <p className=" text-sm">{formatFileSize(totalSize)}</p>
          </div>
        </div>
      </div>

      <div className="w-full p-4 border-2 border-dashed border-border dark:border-coal text-center relative border-t-0 rounded-b-md">
        <div className="border-t-2 border-solid border-border dark:border-coal absolute top-0 left-0 w-full" />
        <input
        aria-label="file"        
          type="file"
          accept={getAcceptedFileTypes()}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          ref={fileInputRef}
          multiple={maxFiles > 1}
        />
        <div
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={handleClick}
        >
          <FaCloudUploadAlt className="text-soft dark:text-faint" />
          <p className="text-soft dark:text-faint">
            {uploading ? (
              <Lottie
                className="size-full max-h-20 max-w-20"
                animationData={uploadingAnimation}
                loop
              />
            ) : error ? (
              <span className="text-alert dark:text-crimson text-sm">{error}</span>
            ) : (
                <span className="text-sm leading-tight">Drag and drop ${fileType} files or browse your computer</span>
            )}
          </p>
        </div>

        {files.length > 0 && (
          <div className="w-full flex items-start flex-wrap gap-3 cursor-pointer mt-2">
            {files.map((item, index) => (
              <div
                key={index}
                className="relative p-2 border border-border dark:border-coal rounded-md flex justify-between items-center bg-tertiary dark:bg-dim cursor-default"
              >
                <div className="flex items-center flex-col gap-2">
                  <Tooltip
                    position="bottom"
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
                      {fileType === "image" ? (
                         <Image
                         src={item.preview!}
                         alt={item.file.name}
                         className="size-20 object-cover rounded-md"
                         width={80} // Set a fixed width
                         height={80} // Set a fixed height
                       />
                      ) : fileType === "video" ? (
                        <video
                          src={item.preview}
                          className="size-20 object-cover rounded-md"
                          controls
                        />
                      ) : (
                        <FaFileAlt className="text-gray-500 text-6xl" />
                      )}
                      <p className="text-xs max-w-20 text-ellipsis overflow-hidden whitespace-nowrap">
                        {item.file.name}
                      </p>
                    </div>
                  </Tooltip>
                  <button
                    type="button"
                    className="bg-black/50 hover:bg-red-500 transition-all cursor-pointer duration-200 ease-linear text-white border-border dark:border-coal border-2 p-1 rounded-full backdrop-blur-lg absolute top-0 right-0"
                    onClick={(e) => cancelFile(index, e)}                   
      title="Remove File"
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

export default FileUpload;