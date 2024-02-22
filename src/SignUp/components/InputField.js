import React, { useState } from 'react';
import './InputField.css';

const FirstNameInput = ({ value, onChange }) => {
  const [error, setError] = useState('');

  const validate = (input) => {
    if (input.trim() === '') {
      setError('Please enter your first name.');
      return false;
    }
    setError('');
    return true;
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    validate(inputValue); // validate the input value
    if (onChange) onChange(inputValue); 
  };

  return (
    <>
      <input
        type="text"
        placeholder="First name"
        value={value} 
        onChange={handleChange}
      />
      {error && <p className="error-message">{error}</p>}
    </>
  );
};

const LastNameInput = ({ value, onChange }) => {
  const [error, setError] = useState('');
  // validate the input value
  const validate = (input) => {
    if (input.trim() === '') {//if empty
      setError('Please enter your last name.');
      return false;
    }
    setError('');
    return true;
  };

  const handleChange = (e) => {
    
    const inputValue = e.target.value;
    validate(inputValue); // validate the input value
    if (onChange) onChange(inputValue); 
  };

  return (
    <>
      <input
        type="text"
        placeholder="Last name"
        value={value} 
        onChange={handleChange}
      />
      {error && <p className="error-message">{error}</p>}
    </>
  );
};

const EmailInput = ({ value, onChange }) => {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const inputValue = e.target.value;
    validate(inputValue); 
    if (onChange) onChange(inputValue); 
  };
  // validate the input value

  const validate = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input)) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError('');
    return true;
  };

  return (
    <>
      <input
        type="email"
        placeholder="Email address"
        value={value} 
        onChange={handleChange}
      />
      {error && <p className="error-message">{error}</p>}
    </>
  );
};
const UsernameInput = ({ value, onChange }) => {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const inputValue = e.target.value;
    validate(inputValue); 
    if (onChange) onChange(inputValue); 
  };

  const validate = (input) => {
    if (input.length < 6) {
      setError('Username must be at least 6 characters long.');
      return false;
    }
    setError('');
    return true;
  };

  return (
    <>
      <input
        type="username"
        placeholder="New Username"
        value={value} 
        onChange={handleChange}
      />
      {error && <p className="error-message">{error}</p>}
    </>
  );
};

const PasswordInput = ({ value, onChange }) => {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const inputValue = e.target.value;
    validate(inputValue); 
    if (onChange) onChange(inputValue); 
  };

  const validate = (input) => {
    if (input.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    setError('');
    return true;
  };

  return (
    <>
      <input
        type="password"
        placeholder="New password"
        value={value} 
        onChange={handleChange}
      />
      {error && <p className="error-message">{error}</p>}
    </>
  );
};

const DateOfBirthInput = ({ value, onChange }) => {
  // No need for validation here
  return (
    <div>
      <label htmlFor="birthdate" className="birthdate-label">
        Date of birth
      </label>
      <input type="date" id="birthdate" className="input-field" value={value} onChange={onChange} />
    </div>
  );
};

export default DateOfBirthInput;

// Gender Input Field
const GenderInput = ({ value, onChange }) => {
  // No need for validation here
  return (
    <div>
      <label htmlFor="gender" className="gender-label">
        Gender
      </label>
      <select id="gender" className="input-field" value={value} onChange={onChange}>
        <option value="" disabled>
          Select your gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};

export { FirstNameInput, LastNameInput, EmailInput,UsernameInput, PasswordInput, DateOfBirthInput, GenderInput };
