import React from 'react';

const Label = props => {
  return (
    <label
      htmlFor={props.forName}
      className={props.styles}
      style={{ color: props.color, borderColor: props.color }}
    >
      <span>{props.text}</span>
    </label>
  );
};

export default Label;
