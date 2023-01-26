import PropTypes from 'prop-types';
export const SearchBar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const input = e.currentTarget.elements.query;
    const value = input.value;
    if (!value) {
      return;
    }
    onSubmit(value);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          name="query"
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
SearchBar.propTypes = { onSubmit: PropTypes.func.isRequired };
