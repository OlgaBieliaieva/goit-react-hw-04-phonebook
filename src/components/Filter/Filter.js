import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ filter, filterChangeHandler }) => {
  return (
    <label className={css.formLabel}>
      Find contacts by name
      <input
        className={css.formInput}
        type="text"
        name="filter"
        value={filter}
        onChange={filterChangeHandler}
        placeholder="type your query here..."
      />
    </label>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  filterChangeHandler: PropTypes.func.isRequired,
};
