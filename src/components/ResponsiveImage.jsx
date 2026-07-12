import React from 'react';
import './ResponsiveImage.css';

const ResponsiveImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  style = {},
  onClick,
  ...props
}) => {
  // Enforce alt descriptions for search bots and screen readers
  const fallbackAlt = 'Authentic Andhra Traditional Pickles & Specials - Guntur Madam Pickles';
  const descriptiveAlt = alt ? alt.trim() : fallbackAlt;

  return (
    <img
      src={src}
      alt={descriptiveAlt}
      className={`responsive-optimized-image ${className}`}
      width={width}
      height={height}
      style={style}
      loading="lazy"
      onClick={onClick}
      {...props}
    />
  );
};

export default ResponsiveImage;
