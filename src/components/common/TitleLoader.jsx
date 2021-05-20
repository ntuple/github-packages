import React from 'react';
import ContentLoader from 'react-content-loader';

const TitleLoader = (props) => (
  <ContentLoader
    speed={2}
    width="60%"
    height={60}
    backgroundColor="#f0f0f0"
    foregroundColor="#c4c4c4"
    {...props}
  >
    <rect x="0" y="15" rx="3" ry="3" width="200" height="10" />
    <rect x="0" y="35" rx="3" ry="3" width="120" height="10" />
  </ContentLoader>
);

export default TitleLoader;
