import React from 'react';
import './Bar.css';

const Bar = ({ value }) => {
  return <div className="bar" style={{ height: `${value}px` }}></div>;
};

export default Bar;
