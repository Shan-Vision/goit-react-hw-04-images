import { GlobalStyle } from './GlobalStyle';
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from './Button/';
import fetchImages from '../service';
import Modal from 'components/Modal';
import Loader from 'components/Loader';

// class OldApp extends Component {
//   state = {
//     images: [],
//     searchName: '',
//     isLoading: false,
//     page: 0,
//     error: null,
//     largeImageURL: null,
//   };

//   async componentDidUpdate(_, prevState) {
//     const prevName = prevState.searchName;
//     const nextName = this.state.searchName;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;
//     const prevImages = prevState.images;
//     const nextImages = this.state.images;

//     if (prevName !== nextName || nextPage > prevPage) {
//       this.setState({ isLoading: true });

//       try {
//         const { hits } = await api.fetchImages(nextName, nextPage);
//         this.setState(state => ({
//           images: state.images
//             ? [...this.state.images, ...updatedImages]
//             : updatedImages,
//         }));
//       } catch (error) {
//         this.setState({ error });
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }

//     if (prevImages !== nextImages) {
//       window.scrollBy({
//         top: document.body.scrollHeight,
//         behavior: 'smooth',
//       });
//     }
//   }

//   handleSubmit = event => {
//     event.preventDefault();
//     const form = event.target.elements;
//     const query = form.name.value;
//     const prevName = this.state.searchName;
//     if (prevName === query || query.trim() === '') {
//       return;
//     }

//     this.setState(state => ({
//       images: [],
//       searchName: query,
//       page: 1,
//     }));
//   };

//   handleLoadMore = () => {
//     this.setState(state => ({ page: state.page + 1 }));
//   };

//   handleModalOpen = image => {
//     this.setState({ largeImageURL: image });
//   };

//   handleModalClose = () => {
//     this.setState({ largeImageURL: null });
//   };

//   render() {
//     const { images, isLoading, error, largeImageURL } = this.state;

//     return (
//       <>
//         <SearchBar onSubmit={this.handleSubmit} />

//         {error && <div>Opps, wrong picture name </div>}

//         {images.length !== 0 && (
//           <ImageGallery images={images} onClick={this.handleModalOpen} />
//         )}

//         {isLoading && <Loader title="Loading" />}

//         {images.length !== 0 && (
//           <Button onClick={this.handleLoadMore} caption="Load More" />
//         )}

//         {largeImageURL && (
//           <Modal onClose={this.handleModalClose}>
//             <img src={largeImageURL} alt="Large type" />
//           </Modal>
//         )}

//         <GlobalStyle />
//       </>
//     );
//   }
// }

// const initialState = {
//   images: [],
//   searchName: '',
//   isLoading: false,
//   page: 1,
//   error: null,
//   largeImageURL: null,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case value:
//       break;

//     default:
//       break;
//   }
// }

const App = () => {
  const [images, setImages] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
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

      {error && <div>Opps, wrong picture name </div>}

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
