import React from 'react';
import './InputField.css'
function InputField({ type, placeholder }) {
  return (
    <input type={type} placeholder={placeholder} className="input-field" />
  );
}

export default InputField;