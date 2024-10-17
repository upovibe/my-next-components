import { useState } from 'react';
import Image from 'next/image';

type ImagePreviewProps = {
  src: string;
  alt: string;
  zoomSrc?: string;
  className?: string;
  indicatorIcon?: JSX.Element;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt,
  zoomSrc,
  className = '',
  indicatorIcon,
}) => {
  const [isPreview, setIsPreview] = useState(false);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative cursor-pointer" onClick={togglePreview}>
        {/* Image component */}
        <Image
          src={src}
          alt={alt}
          className="object-cover"
          layout="responsive"
          width={500}
          height={300}
        />

        {/* Eye icon on hover */}
        {indicatorIcon && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            {indicatorIcon}
          </div>
        )}
      </div>

      {/* Preview mode - Fullscreen */}
      {isPreview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
          onClick={togglePreview}
        >
          <div className="relative">
            {/* Zoomed Image */}
            <Image
              src={zoomSrc || src}
              alt={alt}
              className="object-contain max-h-screen max-w-screen cursor-pointer"
              layout="intrinsic"
              width={600}
              height={600}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
