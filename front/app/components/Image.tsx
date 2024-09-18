// components/Image.tsx
import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, width = 300, height = 300, className = "" }) => {
  const defaultImage = "../public/testMovieImage.jpg"; 

  return (
    <img
      src={src || defaultImage}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover ${className}`}
      onError={(e) => (e.currentTarget.src = defaultImage)} 
    />
  );
};

export default Image;
