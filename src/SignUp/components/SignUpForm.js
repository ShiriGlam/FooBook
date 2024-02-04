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


  const handlePhotoSelect = (photo) => {
    setProfilePhoto(photo);
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
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  );
};

export default SignUpForm;

