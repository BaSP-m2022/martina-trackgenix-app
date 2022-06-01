import React from 'react';
import PropTypes from 'prop-types';

function Btn({ onClick, text, color }) {
  return (
    <button a onClick={onClick} style={{ backgroundColor: color, cursor: 'pointer' }}>
      {text}
    </button>
  );
}
Btn.defaultProps = {
  text: '',
  color: 'black'
};

Btn.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  color: PropTypes.string
};
export default Btn;
