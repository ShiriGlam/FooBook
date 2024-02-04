import React from 'react';
import InputField from '../../App/components/InputField';
import './InputField.css'
// First Name Input Field
const FirstNameInput = () => {
  return <InputField type="text" placeholder="First name" />;
}

// Last Name Input Field
const LastNameInput = () => {
  return <InputField type="text" placeholder="Last name" />;
}

// Email Input Field
const EmailInput = () => {
  return <InputField type="email" placeholder="Email address" />;
}

// Password Input Field
const PasswordInput = () => {
  return <InputField type="password" placeholder="New password" />;
}

// Date of Birth Input Field
const DateOfBirthInput = () => {
  return (
    <div>
      <label htmlFor="birthdate" className="birthdate-label">Date of birth</label>
      <input type="date" id="birthdate" className="input-field" />
    </div>
  );
}

// Gender Input Field
const GenderInput = () => {
  return (
    <div>
      <label htmlFor="gender" className="gender-label">Gender</label>
      <select id="gender" className="input-field">
        <option value="" disabled selected>Select your gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
}

export { FirstNameInput, LastNameInput, EmailInput, PasswordInput, DateOfBirthInput, GenderInput };
