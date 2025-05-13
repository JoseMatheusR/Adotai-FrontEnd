import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export interface CarouselSlide {
  image: string;
  title: string;
  description: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
  showIndicators?: boolean;
  height?: number | string;
  visibleSlides?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoPlayInterval = 5000,
  showIndicators = false,
  height = 400,
  visibleSlides = 5,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [autoPlay, setAutoplay] = useState<boolean>(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const goToNext = (): void => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToPrevious = (): void => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number): void => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (!autoPlay) return undefined;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return (): void => clearInterval(interval);
  }, [currentIndex, autoPlay, autoPlayInterval]);

  if (slides.length === 0) return null;

  const getVisibleSlideIndices = () => {
    const halfVisible = Math.floor(visibleSlides / 2);
    const indices = [];

    for (let i = -halfVisible; i <= halfVisible; i++) {
      let index = (currentIndex + i + slides.length) % slides.length;
      indices.push(index);
    }

    return indices;
  };

  const visibleIndices = getVisibleSlideIndices();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        padding: "40px 0",
      }}
    >
      {/* Multiple Slides Container */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: height,
          width: "100%",
          position: "relative",
        }}
      >
        {visibleIndices.map((slideIndex, arrayIndex) => {
          const isCurrent = slideIndex === currentIndex;
          const distanceFromCenter = arrayIndex - Math.floor(visibleSlides / 2);

          let scale, width, height, translateX, zIndex;
          if (isCurrent) {
            scale = 1;
            width = "280px";
            height = "380px";
            translateX = "0";
            zIndex = 3;
          } else if (distanceFromCenter === -1) {
            // Left neighbor
            scale = 0.85;
            width = "230px";
            height = "340px";
            translateX = "-350px";
            zIndex = 2;
          } else if (distanceFromCenter === 1) {
            // Right neighbor
            scale = 0.85;
            width = "230px";
            height = "340px";
            translateX = "350px";
            zIndex = 2;
          } else if (distanceFromCenter < -1) {
            // Far left
            scale = 0.7;
            width = "200px";
            height = "250px";
            translateX = "-740px";
            zIndex = 1;
          } else {
            // Far right
            scale = 0.7;
            width = "200px";
            height = "250px";
            translateX = "740px";
            zIndex = 1;
          }

          return (
            <Box
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              onMouseEnter={() => setHoveredIndex(slideIndex)}
              onMouseLeave={() => setHoveredIndex(null)}
              sx={{
                cursor: "pointer",
                width: width,
                height: height,
                transform: `scale(${scale}) translateX(${translateX})`,
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "absolute",
                zIndex: zIndex,
                "&:hover": {
                  transform: `scale(${Math.min(
                    scale * 1.05
                  )}) translateX(${translateX})`,
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  boxShadow: () => {
                    const verticalOffset = `${parseFloat(height) * 0.05}px`;
                    const blur = `${parseFloat(height) * 0.1}px`;
                    const spread = `${parseFloat(height) * 0.02}px`;
                    return `0 ${verticalOffset} ${blur} ${spread} rgba(0,0,0,0.2)`;
                  },
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "10px",
                }}
              >
                {/* Image section */}
                <Box
                  sx={{
                    height: "100%",
                    backgroundImage: `url(${slides[slideIndex].image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    transition: "all 0.3s ease",
                  }}
                />

                {/* Content section */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: hoveredIndex === slideIndex ? "30%" : 0,
                    backgroundColor: "rgba(0,0,0,0.7)",
                    color: "white",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    borderRadius: "0px 0px 10px 10px",
                    padding: hoveredIndex === slideIndex ? "16px" : "0 16px",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" noWrap>
                    {slides[slideIndex].title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {slides[slideIndex].description}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Button
        onClick={goToPrevious}
        sx={{
          position: "absolute",
          top: "50%",
          left: "32px",
          transform: "translateY(-50%)",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
            width: "80px",
            transition: "ease-in-out 0.2s",
          },
          minWidth: "50px",
          width: "75px",
          height: "50px",
          zIndex: 20,
        }}
      >
        <svg viewBox="0 0 49 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M48.0911 10.7828C47.3186 11.1305 43.6877 11.2465 35.8079 11.2851C23.6792 11.2851 21.5162 11.0533 12.7094 8.77331L8.49908 7.6913L7.61067 9.73939C6.1815 12.9081 5.6021 12.8308 2.51199 8.96653C0.426171 6.37743 0.039907 5.52729 0.0012806 3.67241C-0.0373458 1.31518 0.773808 0.851466 5.71798 0.310462C9.61924 -0.153255 9.92826 -0.114613 10.4304 0.54232C10.7394 0.967395 10.8553 1.66297 10.6622 2.39719C10.16 4.71578 10.2373 4.98628 11.7823 5.52729C14.293 6.41608 21.7093 7.9618 26.5376 8.58009C29.0869 8.92788 35.1513 9.31431 39.9796 9.43024C44.8079 9.54617 48.8636 9.81667 48.9795 10.0099C49.0954 10.1645 48.7091 10.5123 48.0911 10.7828Z"
            fill="black"
          />
        </svg>
      </Button>

      <Button
        onClick={goToNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: "32px",
          transform: "translateY(-50%)",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
            width: "80px",
            transition: "ease-in-out 0.2s",
          },
          minWidth: "50px",
          width: "75px",
          height: "50px",
          zIndex: 20,
        }}
      >
        <svg viewBox="0 0 49 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.908897 10.7828C1.68142 11.1305 5.31231 11.2465 13.1921 11.2851C25.3208 11.2851 27.4838 11.0533 36.2906 8.77331L40.5009 7.6913L41.3893 9.73939C42.8185 12.9081 43.3979 12.8308 46.488 8.96653C48.5738 6.37743 48.9601 5.52729 48.9987 3.67241C49.0373 1.31518 48.2262 0.851466 43.282 0.310462C39.3808 -0.153255 39.0717 -0.114613 38.5696 0.54232C38.2606 0.967395 38.1447 1.66297 38.3378 2.39719C38.84 4.71578 38.7627 4.98628 37.2177 5.52729C34.707 6.41608 27.2907 7.9618 22.4624 8.58009C19.9131 8.92788 13.8487 9.31431 9.02043 9.43024C4.19214 9.54617 0.136372 9.81667 0.0204926 10.0099C-0.0953865 10.1645 0.290874 10.5123 0.908897 10.7828Z"
            fill="black"
          />
        </svg>
      </Button>

      {showIndicators && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 4,
            gap: "8px",
          }}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => goToSlide(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor:
                  index === currentIndex ? "primary.main" : "grey.400",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Carousel;
