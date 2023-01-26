import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  static propTypes = {
    image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
  };
  state = {
    isModalOpen: false,
  };
  handleToggleModal = () => {
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  };
  render() {
    const { webformatURL, largeImageURL } = this.props.image;
    const { isModalOpen } = this.state;
    return (
      <>
        <li onClick={this.handleToggleModal} className="ImageGalleryItem">
          <img
            className="ImageGalleryItem-image"
            src={webformatURL}
            alt="img"
          />
        </li>
        {isModalOpen && (
          <Modal onClose={this.handleToggleModal} largeImg={largeImageURL} />
        )}
      </>
    );
  }
}
