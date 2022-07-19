import { GlobalStyle } from './GlobalStyle';
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from './Button/';
import fetchImages from '../service';
import Modal from 'components/Modal';
import Loader from 'components/Loader';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [mistake, setMistake] = useState(null);
  const [largeImageUrl, setLargeImageUrl] = useState(null);

  useEffect(() => {
    if (!page) {
      return;
    }
    setIsLoading(true);
    fetchImages(searchName, page)
      .then(updatedImages => {
        setImages(images => [...images, ...updatedImages]);
      })
      .catch(mistake => console.log(mistake))
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, searchName]);

  useEffect(() => {
    window.scrollBy({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [images]);

  const handleSubmit = query => {
    setImages([]);
    setSearchName(query);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleModalOpen = image => {
    setLargeImageUrl(image);
  };

  const handleModalClose = () => {
    setLargeImageUrl(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />

      {mistake && <div>Opps, wrong picture name </div>}

      {images.length !== 0 && (
        <ImageGallery images={images} onClick={handleModalOpen} />
      )}

      {isLoading && <Loader title="Loading" />}

      {images.length !== 0 && (
        <Button onClick={handleLoadMore} caption="Load More" />
      )}

      {largeImageUrl && (
        <Modal onClose={handleModalClose} largeImage={largeImageUrl} />
      )}

      <GlobalStyle />
    </>
  );
};

export default App;
