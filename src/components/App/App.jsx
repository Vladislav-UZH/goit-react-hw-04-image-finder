import { useEffect, useState } from 'react';
import { fetchImages } from 'service/fetchImages';
// Components
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { SearchBar } from 'components/SearchBar/SearchBar';
import Notification from 'components/Notification';
//___APP___

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImgs, setTotalImgs] = useState(0);

  useEffect(() => {
    const handleFetchImages = async (query, page) => {
      try {
        setIsLoading(true);
        const resp = await fetchImages(query, page);
        const nextImgs = resp.hits;
        if (!nextImgs.length) {
          return setImages([]);
        }
        setImages(prevImgs =>
          page === 1 ? [...nextImgs] : [...prevImgs, ...nextImgs]
        );
        setTotalImgs(resp.totalHits);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (!query) {
      return;
    }
    handleFetchImages(query, page);
  }, [query, page]);
  const handleLoadMore = () => setPage(prevPage => prevPage + 1);

  const handleSubmit = query => {
    setPage(1);
    setQuery(query);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 80,
      }}
    >
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {!images.length ? (
        <Notification message="There aren`t images here... Enter something to search for!" />
      ) : (
        <ImageGallery images={images} />
      )}

      {isLoading ? (
        <Loader />
      ) : (
        images.length !== 0 &&
        images.length < totalImgs && <Button onClick={handleLoadMore} />
      )}
    </div>
  );
};
