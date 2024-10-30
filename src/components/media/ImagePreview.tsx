import { useState } from 'react';
import Image from 'next/image';

type ImagePreviewProps = {
  src: string;
  alt: string;
  zoomSrc?: string;
  indicatorIcon?: JSX.Element;
  className?: string;
  width?: number;
  height?: number;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt,
  zoomSrc,
  indicatorIcon,
  className = '',
  width = 500,
  height = 300,
}) => {
  const [isPreview, setIsPreview] = useState(false);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative cursor-pointer" onClick={togglePreview}>
        <Image
          src={src}
          alt={alt}
          className={`object-cover ${className}`}
          layout="fixed"
          width={width}
          height={height}
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
          <div className="relative size-10/12 md:size-8/12 lg:size-6/12 transition-all duration-200 ease-linear">
            <Image
              src={zoomSrc || src}
              alt={alt}
              className="object-contain max-h-full max-w-full cursor-pointer"
              layout="fill"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
