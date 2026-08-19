// Separator.jsx
import React from 'react';

const Separator = ({ color = '#ccc', thickness = '1px', space = '20px' }) => {
  return (
    <hr
      style={{
        border: 'none',
        height: thickness,
        backgroundColor: color,
        marginTop: space,
        marginBottom: space,
        width: '100%'
      }}
    />
  );
};

export default Separator;
