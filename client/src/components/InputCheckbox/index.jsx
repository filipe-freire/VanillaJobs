import React from 'react';

const InputCheckbox = props => {
  return (
    <input
      type="checkbox"
      id={props.id}
      name="tech"
      value={props.value}
      onChange={props.handleChange}
      required
    />
  );
};

export default InputCheckbox;
