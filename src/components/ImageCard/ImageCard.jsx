import css from './ImageCard.module.css'

const ImageCard = ({ alt, src, onClick }) => {
  return (
    <div className={css.imageCard}>
      <img src={src} alt={alt} onClick={onClick} />
    </div>
  );
};

export default ImageCard;
