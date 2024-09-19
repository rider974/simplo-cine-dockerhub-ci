"use client";

import React from "react";

import Image from 'next/image'; 

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const MovieImage: React.FC<ImageProps> = ({ src, alt, width = 300, height = 300, className = "" }) => {
  const defaultImage = "/testMovieImage.jpg"; 

  return (
    <Image
      src={src || defaultImage} 
      alt={alt}
      width={width}
      height={height}
      className={`object-cover ${className}`}
    />
  );
};

export default MovieImage;
