import React from 'react';
import Label from './../Label';

const InputText = props => {
  return (
    <div>
      <input
        type="text"
        id={props.id}
        name={props.id}
        value={props.value}
        onChange={props.handleChange}
        className="input-text"
        autoComplete="off"
        required
      />
      <Label forName={props.id} styles="label-input-text" text={props.label} />
    </div>
  );
};

export default InputText;
