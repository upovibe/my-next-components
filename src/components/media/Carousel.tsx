import { useState, useEffect, useRef, ReactNode, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSwipeable } from "react-swipeable"; // Import the swipeable hook

// Your existing interfaces...
interface CarouselItemTemplate {
  id: number;
  content: ReactNode;
}

interface ResponsiveOption {
  maxWidth: number;
  numVisible: number;
  numScroll: number;
}

interface CarouselProps {
  itemTemplates: CarouselItemTemplate[];
  numVisible: number;
  numScroll: number;
  autoScroll?: boolean;
  autoScrollInterval?: number;
  circular?: boolean;
  showIndicators?: boolean;
  className?: string;
  responsiveOptions?: ResponsiveOption[];
  showNavOnHover?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  itemTemplates,
  numVisible: defaultNumVisible,
  numScroll: defaultNumScroll,
  autoScroll,
  autoScrollInterval = 3000,
  circular,
  showIndicators,
  className,
  responsiveOptions = [],
  showNavOnHover,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState(itemTemplates);
  const [numVisible, setNumVisible] = useState(defaultNumVisible);
  const [numScroll, setNumScroll] = useState(defaultNumScroll);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalItems = itemTemplates.length;
  const autoScrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Adjust items based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const matchedOption = responsiveOptions.find((option) => width <= option.maxWidth);
      
      if (matchedOption) {
        setNumVisible(matchedOption.numVisible);
        setNumScroll(matchedOption.numScroll);
      } else {
        setNumVisible(defaultNumVisible);
        setNumScroll(defaultNumScroll);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [responsiveOptions, defaultNumVisible, defaultNumScroll]);

  // Set up circular carousel behavior
  useEffect(() => {
    if (circular) {
      const startDup = itemTemplates.slice(-numVisible);
      const endDup = itemTemplates.slice(0, numVisible);
      setItems([...startDup, ...itemTemplates, ...endDup]);
      setCurrentIndex(numVisible);
    } else {
      setItems(itemTemplates);
    }
  }, [circular, itemTemplates, numVisible]);

  // Scroll to next set of items
  const scrollNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setTimeout(() => {
      const nextIndex = currentIndex + numScroll;
      setCurrentIndex(nextIndex);

      if (circular && nextIndex >= totalItems + numVisible) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(numVisible);
        }, 500);
      } else {
        setIsTransitioning(false);
      }

      stopAutoScroll();
    }, 500);
  }, [currentIndex, isTransitioning, numScroll, circular, totalItems, numVisible]);

  // Scroll to previous set of items
  const scrollPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setTimeout(() => {
      const prevIndex = currentIndex - numScroll;
      setCurrentIndex(prevIndex);

      if (circular && prevIndex < 0) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(totalItems);
        }, 500);
      } else {
        setIsTransitioning(false);
      }

      stopAutoScroll();
    }, 500);
  }, [currentIndex, isTransitioning, numScroll, circular, totalItems]);

  // Set up auto-scroll functionality
  useEffect(() => {
    if (autoScroll) {
      autoScrollTimeout.current = setInterval(() => {
        scrollNext();
      }, autoScrollInterval);

      return () => clearInterval(autoScrollTimeout.current as NodeJS.Timeout);
    }
  }, [autoScroll, autoScrollInterval, scrollNext]);

  // Stop and restart auto-scroll
  const stopAutoScroll = () => {
    if (autoScrollTimeout.current) {
      clearInterval(autoScrollTimeout.current);
    }
  };

  const restartAutoScroll = () => {
    if (autoScroll && !autoScrollTimeout.current) {
      autoScrollTimeout.current = setInterval(() => {
        scrollNext();
      }, autoScrollInterval);
    }
  };

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => scrollNext(),
    onSwipedRight: () => scrollPrev(),
    trackMouse: true // Optional: for mouse swipes
  });

  // Calculate translateX value for the carousel
  const getTranslateValue = () => {
    return `translateX(-${(currentIndex * 100) / numVisible}%)`;
  };

  return (
    <div
      {...handlers} // Attach swipe handlers here
      className={`relative overflow-hidden group transition-all ease-linear duration-200 ${className}`}
      onMouseEnter={stopAutoScroll}
      onMouseLeave={restartAutoScroll}
    >
      <div className="horizontal-carousel w-full p-8">
        <div className="overflow-hidden flex-row w-full">
          <div
            className="flex flex-row transition-transform duration-500 ease-in-out"
            style={{ transform: getTranslateValue() }}
          >
            {items.map((itemTemplate) => (
              <div
                key={itemTemplate.id}
                className="w-auto h-auto px-2 flex-shrink-0 flex items-center"
                style={{ flexBasis: `${100 / numVisible}%` }}
              >
                {itemTemplate.content}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="navigate left"
          className={`absolute top-1/2 transform -translate-y-1/2 left-0 size-8 text-light flex items-center justify-center bg-black/20 rounded-full hover:bg-black/40 transition-all ease-linear duration-200 cursor-pointer
            ${showNavOnHover ? "hidden group-hover:flex" : ""}`}
          onClick={scrollPrev}
          disabled={isTransitioning}
        >
          <FaChevronLeft className="text-sm" />
        </button>

        <button
          type="button"
          aria-label="navigate right"
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 size-8 text-light flex items-center justify-center bg-black/20 rounded-full hover:bg-black/40 transition-all ease-linear duration-200 cursor-pointer
            ${showNavOnHover ? "hidden group-hover:flex" : ""}`}
          onClick={scrollNext}
          disabled={isTransitioning}
        >
          <FaChevronRight className="text-sm" />
        </button>
      </div>

      {showIndicators && (
        <div className="absolute bottom-4 w-full flex justify-center gap-2">
          {Array.from({ length: Math.ceil(totalItems / numVisible) }).map((_, i) => (
            <button
              type="button"
              aria-label="indicator-button"
              key={i}
              className={`h-1 w-5 rounded-full ${
                i === Math.floor(currentIndex / numScroll) ? "bg-highlight dark:bg-ocean" : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(i * numScroll)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
