import React, { useState } from "react";
import Image from "next/image";
import { FaImages } from "react-icons/fa";
import Lottie from "lottie-react";
import uploadingAnimation from "@/assets/animations/Loading.json";
import defaultAvatar from "../../../../public/images/avatar.png";

interface AvatarUploadProps {
  defaultImage?: string;
  size?: number;
  onImageUpload?: (image: string) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  defaultImage,
  size = 160,
  onImageUpload,
}) => {
  const [image, setImage] = useState<string | undefined>(
    defaultImage || defaultAvatar.src
  );
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = () => {
        const uploadedImage = reader.result as string;
        setTimeout(() => {
          setImage(uploadedImage);
          setLoading(false);
          if (onImageUpload) {
            onImageUpload(uploadedImage);
          }
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center mx-auto border-2 border-border dark:border-coal rounded-full"
      style={{ width: size, height: size }}
    >
      <label htmlFor="avatarInput" className="cursor-pointer group">
        <div
          className="relative rounded-full overflow-hidden"
          style={{ width: size, height: size }}
        >
          {loading ? (
            <div className="w-full h-full bg-gray-300/50 animate-pulse flex items-center justify-center">
              <Lottie
                animationData={uploadingAnimation}
                loop
                style={{ width: size * 0.3, height: size * 0.3 }}
              />
            </div>
          ) : (
            <Image
              src={image || defaultAvatar.src}
              alt="Uploaded avatar"
              layout="fill"
              objectFit="cover"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-40">
            <FaImages className="text-white" style={{ fontSize: size * 0.15 }} />
          </div>
        </div>
        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default AvatarUpload;
