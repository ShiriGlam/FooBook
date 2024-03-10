import React, { useState } from 'react';
import Logo from '../../App/components/Logo';
import Title from './Title';
import { FirstNameInput, LastNameInput, EmailInput,UsernameInput, PasswordInput, DateOfBirthInput, GenderInput } from './InputField';
import Terms from './Terms';
import SubmitButton from './SubmitButton';
import ProfilePhotoUpload from './ProfilePhotoUpload';
import './SignUpForm.css';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); 
  const [dateOfBirth, setDateOfBirth] = useState(''); 
  const [gender, setGender] = useState(''); 
  const handlePhotoSelect = (photo) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePhoto(reader.result); // Save the photo URL directly
    };
    reader.readAsDataURL(photo);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userData = {
        firstName,
        lastName,
        email,
        username,
        password,
        profilePhoto
      };

      try {
        console.log(userData);
        const response = await fetch('http://localhost:3001/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        
          body: JSON.stringify(userData)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }

        alert('User created successfully! Redirecting to login...');
        window.location.href = '/login';
      } catch (error) {
        console.error('Error:', error.message);
        alert('An error occurred while creating the user. Please try again later.');
      }
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
        <UsernameInput value={username} onChange={(newValue) => setUsername(newValue)} />
        <PasswordInput value={password} onChange={(newValue) => setPassword(newValue)} />
        <DateOfBirthInput value={dateOfBirth} onChange={(newValue) => setDateOfBirth(newValue)} />
        <GenderInput value={gender} onChange={(newValue) => setGender(newValue)} />
        <Terms />
        <SubmitButton />
      </form>
      <p>Already have an account? <Link to='/login'>Log in</Link></p>
    </div>
  );
};

export default SignUpForm;
