import React from 'react';

import './style.scss';

const Button = props => {
  return <button className={props.styles}>{props.name}</button>;
};

export default Button;
