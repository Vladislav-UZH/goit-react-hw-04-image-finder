import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <ul className="ImageGallery">
      {images.map(img => {
        return <ImageGalleryItem key={img.id} image={img} />;
      })}
    </ul>
  );
};
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ),
};
