import { Message } from './Notification.styled';
import PropTypes from 'prop-types';
const Notification = ({ message }) => {
  return (
    <Message>
      <p>{message ?? 'There are not images here!'}</p>
      <img
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        width={400}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Stoned_Fox.jpg/640px-Stoned_Fox.jpg"
        alt=""
      />
    </Message>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
};

export default Notification;
