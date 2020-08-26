import React from 'react';

const Label = props => {
  return (
    <label htmlFor={props.forName} className={props.styles}>
      {props.text}
    </label>
  );
};

export default Label;
