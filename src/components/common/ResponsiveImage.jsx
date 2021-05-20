import React from 'react';
import screenSize from '../../lib/constants/screenSize';

const ResponsiveImage = ({
  className,
  srcSet,
  mobileSrcSet = '',
  alt = '',
}) => (
  <picture>
    {mobileSrcSet && (
      <source
        media={`(max-width: ${screenSize.MEDIUM - 1}px)`}
        srcSet={mobileSrcSet}
      />
    )}

    <img srcSet={srcSet} className={className} alt={alt} />
  </picture>
);

export default ResponsiveImage;
