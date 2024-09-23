import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
// import ErrorMessage from './ErrorMessage/ErrorMessage';
import './App.css';
import { fetchArticles } from '../services/api';
import ImageModal from './ImageModal/ImageModal';

import { useMemo } from 'react';

function App() {
  // const [images, setImages] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  // const handleSearch = async topic => {
  //   try {
  //     setImages([]);
  //     setError(false);
  //     setLoading(true);
  //     const data = await fetchArticlesWithTopic(topic);
  //     setImages(data);
  //   } catch (error) {
  //     setError(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    const getData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchArticles(page, query);
        setImages(prev => [...prev, ...data.hits]);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [page, query]);

  const handleChangePage = () => {
    setPage(prev => prev + 1);
  };

  const openModal = imageData => {
    setSelectedImage(imageData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleSubmit = query => {
    setQuery(query);
    setPage(1); // Скинути сторінку до початкової
    setImages([]); // Очищення попередніх результатів пошуку
  };

  return (
    <>
      {/* {isLoading && <Loader />}
      {isError && <ErrorMessage />} */}
      {isLoading && <Loader />}
      {isError && <h2>Something went wrong! Try again!</h2>}

      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        imageData={selectedImage}
      />
      <SearchBar onSubmit={handleSubmit} />
      <button onClick={handleChangePage}>Load more</button>
    </>
  );
}

export default App;
