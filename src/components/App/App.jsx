import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import { fetchImages } from 'service/fetchImages';
// Components

// import Notification from 'components/Notification';
//___APP___

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImgs, setTotalImgs] = useState(0);
  // fetch

  // effects
  useEffect(() => {
    const handleFetchImages = async (query, page) => {
      try {
        const resp = await fetchImages(query, page);
        setImages(page === 1 ? [...resp.hits] : [...images, ...resp.hits]);
        setTotalImgs(resp.totalHits);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    handleFetchImages(query, page);
  }, [query, page]);
  // load more
  const handleLoadMore = () => {
    setPage(page + 1);
    setIsLoading(true);
  };
  // submit
  const handleSubmit = query => {
    setQuery(query);
    setIsLoading(true);
  };
  // render Button / Loader
  const renderButtonOrLoader = () => {
    return isLoading ? (
      <Loader />
    ) : (
      images.length !== 0 && images.length < totalImgs && (
        <Button onClick={handleLoadMore} />
      )
    );
  };
  // render
  return (
    <div
      style={{
        // padding: 20,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#22232B',
      }}
    >
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {renderButtonOrLoader()}
    </div>
  );
};

// export class App extends Component {
// state = {
//   query: '',
//   images: [],
//   page: 1,
//   isLoading: false,
//   totalImgs: 0,
// };
// componentDidUpdate(_, prevState) {
//   const { query, page } = state;
//   if (prevquery !== query || prevpage !== page) {
//     handleFetchImages(query, page);
//   }
// }
// handleFetchImages = async (query, page) => {
//   try {
//     const resp = await fetchImages(query, page);
//     setState(({ images }) => ({
//       images: page === 1 ? [...resp.hits] : [...images, ...resp.hits],
//       totalImgs: resp.totalHits,
//     }));
//   } catch (error) {
//     console.log(error);
//   } finally {
//     setState({ isLoading: false });
//   }
// };
// handleLoadMore = () => {
//   setState(({ page }) => ({ page: page + 1, isLoading: true }));
// };
// handleSubmit = query => {
//   setState({ query, isLoading: true });
// };
// renderButtonOrLoader = () => {
//   return isLoading ? (
//     <Loader />
//   ) : (
//     images.length !== 0 &&
//       images.length < totalImgs && (
//         <Button onClick={handleLoadMore} />
//       )
//   );
// };
// render() {
// return (
//   <div
//     style={{
//       // padding: 20,
//       display: 'flex',
//       justifyContent: 'center',
//       flexDirection: 'column',
//       alignItems: 'center',
//       backgroundColor: '#22232B',
//     }}
//   >
//     <SearchBar onSubmit={handleSubmit} />
//     <ImageGallery images={images} />
//     {renderButtonOrLoader()}
//   </div>
// );
//   }
// }
