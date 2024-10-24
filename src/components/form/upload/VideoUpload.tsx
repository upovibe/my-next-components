"use client";

import React, { useRef, useState, useEffect } from "react";
import { FaCloudUploadAlt, FaTimes, FaFileUpload } from "react-icons/fa";
import Lottie from "lottie-react";
import uploadingAnimation from "@/assets/animations/Loading.json";
import Tooltip from "@/components/common/Tooltip";

interface VideoUploadProps {
  onFileUpload: (files: File[]) => void;
  maxFiles?: number;
  showSubmit?: boolean;
  showClear?: boolean;
  showUpload?: boolean;
}

const VideoUpload: React.FC<VideoUploadProps> = ({
  onFileUpload,
  maxFiles = 5,
  showSubmit = false,
  showClear = true,
  showUpload = true,
}) => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<
    { file: File; date: string; preview: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [totalSize, setTotalSize] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const size = files.reduce((acc, { file }) => acc + file.size, 0);
    setTotalSize(size);

    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.preview));
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
      const validFiles = fileArray.filter((file) =>
        file.type.startsWith("video/")
      );

      if (validFiles.length + files.length > maxFiles) {
        setError(`You can only upload up to ${maxFiles} videos.`);
        return;
      }

      if (validFiles.length > 0) {
        setError(null);
        setUploading(true);

        setTimeout(() => {
          const newFiles = validFiles.map((file) => ({
            file,
            date: new Date().toLocaleDateString(),
            preview: URL.createObjectURL(file),
          }));
          setFiles((prevFiles) => [...prevFiles, ...newFiles]);
          onFileUpload([...files.map((f) => f.file), ...validFiles]);
          setUploading(false);
        }, 2000);
      } else {
        setError("Only video files are allowed.");
      }
    }
  };

  const cancelFile = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const newFiles = [...files];
    URL.revokeObjectURL(newFiles[index].preview);
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFileUpload(newFiles.map((f) => f.file));
  };

  const clearAllFiles = () => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
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
            <p className=" text-sm">
              {files.length > 0 ? `${files.length} video(s) uploaded` : ""}
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
            <p className=" text-sm">
              {formatFileSize(totalSize)}
            </p>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="w-full p-4 border-2 border-dashed border-border dark:border-coal text-center relative border-t-0 rounded-b-md">
        <div className="border-t-2 border-solid border-border dark:border-coal absolute top-0 left-0 w-full" />
        <input
        aria-label="video"
          type="file"
          accept="video/*"
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
              <span className="text-alert dark:text-crimson">{error}</span>
            ) : (
              "Drag and drop videos or browse your computer"
            )}
          </p>
        </div>

        {/* Uploaded Files with Previews */}
        {files.length > 0 && (
          <div
            onClick={handleClick}
            className="w-full flex items-start flex-wrap gap-3 cursor-pointer"
          >
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
                        <p className="text-sm ">{item.file.name}</p>
                        <p className="text-sm ">{formatFileSize(item.file.size)}</p>
                        <p className="text-sm ">Uploaded on: {item.date}</p>
                      </>
                    }
                  >
                    <div className="flex flex-col items-center gap-2">
                      {/* Video preview */}
                      <video
                        src={item.preview}
                        controls
                        className="size-24 object-cover rounded-md"
                      />
                      <p className="text-xs text-deep dark:text-light truncate max-w-[80px]">
                        {item.file.name}
                      </p>
                    </div>
                  </Tooltip>
                  <button
                    type="button"
                    className="text-deep absolute top-0 right-0 p-1 rounded-full border-border dark:border-coal border-2 bg-black/10 dark:bg-white/50 backdrop-blur-sm"
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

export default VideoUpload;
