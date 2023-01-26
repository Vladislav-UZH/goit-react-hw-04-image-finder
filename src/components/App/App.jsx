import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { Component } from 'react';
import { fetchImages } from 'service/fetchImages';
// Components

// import Notification from 'components/Notification';
//___APP___
export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    totalImgs: 0,
  };
  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.handleFetchImages(query, page);
    }
  }
  handleFetchImages = async (query, page) => {
    try {
      const resp = await fetchImages(query, page);
      this.setState(({ images }) => ({
        images: page === 1 ? [...resp.hits] : [...images, ...resp.hits],
        totalImgs: resp.totalHits,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  handleLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1, isLoading: true }));
  };
  handleSubmit = query => {
    this.setState({ query, isLoading: true });
  };
  renderButtonOrLoader = () => {
    return this.state.isLoading ? (
      <Loader />
    ) : (
      this.state.images.length !== 0 &&
        this.state.images.length < this.state.totalImgs && (
          <Button onClick={this.handleLoadMore} />
        )
    );
  };
  render() {
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
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
        {this.renderButtonOrLoader()}
      </div>
    );
  }
}
