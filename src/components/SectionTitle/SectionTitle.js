import PropTypes from 'prop-types';

const SectionTitle = ({ text }) => {
  return (
    <>
      <h2>{text}</h2>
    </>
  );
};

export default SectionTitle;

SectionTitle.propTypes = {
  text: PropTypes.string.isRequired,
};
