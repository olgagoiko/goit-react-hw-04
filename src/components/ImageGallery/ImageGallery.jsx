import ImageCard from '../ImageCard/ImageCard';
// import s from './ImageGallery.module.css';

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={s.container}>
      {images &&
        images.map(
          (
            {
              id,
              urls: { regular, small },
              alt_description,
              description,
              likes,
              user: { instagram_username, name },
            },
            i
          ) => {
            return (
              <li key={id} className={s.wrap}>
                <ImageCard
                  src={small}
                  alt={alt_description}
                  onClick={() =>
                    onImageClick({
                      regular,
                      alt_description,
                      description,
                      likes,
                      name,
                    })
                  }
                />
              </li>
            );
          }
        )}
    </ul>
  );
}
