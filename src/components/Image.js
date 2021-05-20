const Image = (prop) => {
  return <img {...prop} srcSet={prop.srcSet} />;
};

export default Image;
