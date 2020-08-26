import React from 'react';

import Label from './../../components/Label';

const InputCheckbox = props => {
  return (
    <>
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      />
      <Label
        forName={props.id}
        styles="py-1 px-3 mr-2"
        text={props.value}
        color={props.color}
      />
    </>
  );
};

export default InputCheckbox;
