const ImageCard = ({ alt, src, onClick }) => {
  return (
    <div>
      <img className={css.img} src={src} alt={alt} onClick={onClick} />
    </div>
  );
};

export default ImageCard;
