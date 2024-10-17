import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type ImageItem = {
  src: string;
  alt: string;
  caption?: string;
  thumbnail?: string;
};

type ImageGalleryProps = {
  images: ImageItem[];
  showIndicators?: boolean;
  indicatorsPosition?: "top" | "bottom" | "left" | "right";
  changeItemOnIndicatorHover?: boolean;
  showItemNavigators?: boolean;
  showItemNavigatorsOnHover?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  circular?: boolean;
  showThumbnails?: boolean; // Prop to show thumbnails beneath the main image
  caption?: (image: ImageItem) => JSX.Element; // Custom caption element
  className?: string;
  sizeClass?: string;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  showIndicators,
  indicatorsPosition = "bottom",
  changeItemOnIndicatorHover,
  showItemNavigators,
  showItemNavigatorsOnHover,
  autoPlay,
  autoPlayInterval = 3000,
  circular,
  showThumbnails, // Show thumbnails prop
  caption,
  className = "",
  sizeClass = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const thumbnailRef = useRef<HTMLDivElement | null>(null);
  const visibleThumbnails = 5;
  const thumbnailWidth = 120;

  // Handle keyboard navigation (left/right arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Wrap the nextImage function in useCallback
  const nextImage = useCallback(() => {
    setActiveIndex((prevIndex) =>
      circular
        ? (prevIndex + 1) % images.length
        : Math.min(prevIndex + 1, images.length - 1)
    );
  }, [circular, images.length]);

  const prevImage = useCallback(() => {
    setActiveIndex((prevIndex) =>
      circular
        ? (prevIndex - 1 + images.length) % images.length
        : Math.max(prevIndex - 1, 0)
    );
  }, [circular, images.length]);

  const goToImage = (index: number) => {
    setActiveIndex(index);
  };

  // Update the effect to include nextImage as a dependency
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoPlay) {
      timer = setInterval(() => {
        nextImage();
      }, autoPlayInterval); // Use customizable autoplay interval
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [autoPlay, nextImage, autoPlayInterval]);

  // Handle thumbnail navigation
  const nextThumbnail = () => {
    setThumbnailStartIndex((prev) =>
      prev + visibleThumbnails < images.length ? prev + 1 : prev
    );
  };

  const prevThumbnail = () => {
    setThumbnailStartIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Manually handle thumbnail scrolling
  useEffect(() => {
    if (thumbnailRef.current) {
      const thumbnailContainer = thumbnailRef.current;
      const scrollOffset =
        thumbnailWidth * activeIndex -
        (thumbnailContainer.clientWidth - thumbnailWidth) / 2;

      // Scroll the thumbnail container to center the active thumbnail
      thumbnailContainer.scrollTo({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  }, [activeIndex, thumbnailWidth]);

  return (
    <div className={`${className}`}>
      <div className="relative group">
        {/* Display Active Image */}
        <div
          className={`relative ${sizeClass} w-full min-w-full max-w-full overflow-hidden`}
        >
          <Image
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            className="object-cover w-full"
            layout="responsive"
            width={800}
            height={500}
          />

          {/* Caption */}
          {caption && (
            <div className="absolute bottom-0 bg-gradient-to-t from-black/40 via-black/25 to-black/10 text-white p-4 w-full">
              <div className="mb-10">{caption(images[activeIndex])}</div>
            </div>
          )}
        </div>

        {/* Navigator: Left/Right Arrows */}
        {!showThumbnails && showItemNavigators && (
          <>
            <button
              aria-label="left-navigation"
              type="button"
              className={`absolute top-1/2 transform -translate-y-1/2 left-4 size-8 text-light flex items-center justify-center bg-black/20 rounded-md hover:bg-black/40 transition-all ease-linear duration-200 ${
                showItemNavigatorsOnHover ? "hidden group-hover:block" : ""
              }`}
              onClick={prevImage}
            >
              <FaChevronLeft className="text-sm" />
            </button>
            <button
              type="button"
              aria-label="right-navigation"
              className={`absolute top-1/2 transform -translate-y-1/2 right-4 size-8 text-light flex items-center justify-center bg-black/20 rounded-md hover:bg-black/40 transition-all ease-linear duration-200 ${
                showItemNavigatorsOnHover ? "hidden group-hover:block" : ""
              }`}
              onClick={nextImage}
            >
              <FaChevronRight className="text-sm" />
            </button>
          </>
        )}

        {/* Indicators */}
        {showIndicators && (
          <div
            className={`absolute flex items-center ${
              indicatorsPosition === "left" || indicatorsPosition === "right"
                ? "top-1/2 transform -translate-y-1/2"
                : indicatorsPosition === "bottom" ||
                  indicatorsPosition === "top"
                ? "justify-center w-full"
                : ""
            } ${
              indicatorsPosition === "top"
                ? "top-2"
                : indicatorsPosition === "bottom"
                ? "bottom-2"
                : ""
            } ${
              indicatorsPosition === "left"
                ? "left-2 flex-col"
                : indicatorsPosition === "right"
                ? "right-2 flex-col"
                : ""
            }`}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={`p-2 m-1 cursor-pointer ${
                  index === activeIndex ? "bg-white" : "bg-gray-400"
                } rounded-full`}
                onClick={() => goToImage(index)}
                onMouseEnter={() =>
                  changeItemOnIndicatorHover && goToImage(index)
                }
              />
            ))}
          </div>
        )}
      </div>

      {showThumbnails && (
  <div className="relative flex justify-center items-center p-4 bg-dim group">
    {/* Left Thumbnail Navigation */}
    <button
      aria-label="left-navigation"
      type="button"
      className="size-8 flex items-center justify-center bg-black/40 text-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-2 hover:bg-black/40 transition-all ease-linear duration-200 opacity-0 group-hover:opacity-100"
      onClick={prevImage}
    >
      <FaChevronLeft />
    </button>

    {/* Thumbnails container */}
    <div className="w-full overflow-x-auto" ref={thumbnailRef}>
      <div
        className="flex items-center gap-1"
        style={{ minWidth: "max-content" }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`cursor-pointer border-2 bg-black/30 hover:bg-black/20 ease-linear duration-200 transition-all ${
              index === activeIndex
                ? "border-highlight dark:border-ocean rounded-lg"
                : "border-border dark:border-coal rounded-lg"
            }`}
            onClick={() => goToImage(index)}
          >
            <Image
              src={image.thumbnail || image.src}
              alt={image.alt}
              width={100}
              height={100}
              className="object-cover size-16 rounded-md bg-black"
            />
          </div>
        ))}
      </div>
    </div>

    {/* Right Thumbnail Navigation */}
    <button
      aria-label="right-navigation"
      type="button"
      className="size-8 flex items-center justify-center bg-black/40 text-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-2 hover:bg-black/40 transition-all ease-linear duration-200 opacity-0 group-hover:opacity-100"
      onClick={nextImage}
    >
      <FaChevronRight />
    </button>
  </div>
)}

    </div>
  );
};

export default ImageGallery;
