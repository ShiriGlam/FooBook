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

const SignUpForm = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false); // State to toggle login form

  const handlePhotoSelect = (photo) => {
    setProfilePhoto(photo);
  };
  
  //replace between the screens:
  const handleLoginClick = () => {
    setShowLoginForm(true); // Show the login form
  };

  return (
    <div className="signup-box">
      <Logo />
      <Title />
      <form>
        <ProfilePhotoUpload onPhotoSelect={handlePhotoSelect} />
        <FirstNameInput />
        <LastNameInput />
        <EmailInput />
        <PasswordInput />
        <DateOfBirthInput />
        <GenderInput />
        <Terms />
        <SubmitButton />
      </form>
      {showLoginForm ? (
        <LoginForm /> // Render LoginForm if showLoginForm is true
      ) : (
        <LoginLink onLoginClick={handleLoginClick} />
      )}
    </div>
  );
};

export default SignUpForm;

