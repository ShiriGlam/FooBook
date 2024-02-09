import React, { useState } from 'react';
import Logo from '../../App/components/Logo';
import Title from './Title';
import { FirstNameInput, LastNameInput, EmailInput, PasswordInput, DateOfBirthInput, GenderInput } from './InputField';
import Terms from './Terms';
import SubmitButton from './SubmitButton';
import LoginLink from './LoginLink';
import LoginForm from '../../App/components/LoginForm'; // Import the LoginForm component
import ProfilePhotoUpload from './ProfilePhotoUpload';
import './SignUpForm.css';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [firstName, setFirstName] = useState(''); // Ensure proper initialization
  const [lastName, setLastName] = useState(''); // Ensure proper initialization
  const [email, setEmail] = useState(''); // Ensure proper initialization
  const [password, setPassword] = useState(''); // Ensure proper initialization
  const [dateOfBirth, setDateOfBirth] = useState(''); // Ensure proper initialization
  const [gender, setGender] = useState(''); // Ensure proper initialization
  const handlePhotoSelect = (photo) => {
    setProfilePhoto(photo);
  };

  const validateForm = () => {
    return (
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      email.trim() !== '' &&
      password.length >= 6 &&
      profilePhoto !== null
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // if form is valid, navigate to login page
      window.location.href = '/login';
      alert('Form submitted successfully! Opening Log in...');
    } else {
      alert('Please fill in all required fields and upload a profile photo.');
    }
  };

  return (
    <div className="signup-box">
      <Logo />
      <Title />
      <form onSubmit={handleSubmit}>
        <ProfilePhotoUpload onPhotoSelect={handlePhotoSelect} />
        <FirstNameInput value={firstName} onChange={(newValue) => setFirstName(newValue)} />
        <LastNameInput value={lastName} onChange={(newValue) => setLastName(newValue)} />
        <EmailInput value={email} onChange={(newValue) => setEmail(newValue)} />
        <PasswordInput value={password} onChange={(newValue) => setPassword(newValue)} />
        <DateOfBirthInput value={dateOfBirth} onChange={(newValue) => setDateOfBirth(newValue)} />
        <GenderInput value={gender} onChange={(newValue) => setGender(newValue)} />
        <Terms />
        <SubmitButton />
      </form>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  );
};

export default SignUpForm;
