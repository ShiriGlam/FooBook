import React from 'react';
import './InputField.css'
const InputField = ({ type, placeholder, value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return <input className="input-field" type={type} placeholder={placeholder} value={value} onChange={handleChange} />;
};

export default InputField ;