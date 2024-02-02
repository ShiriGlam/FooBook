import React from 'react';
import Logo from '../../App/components/Logo';
import Title from './Title';
import { FirstNameInput, LastNameInput, EmailInput, PasswordInput, DateOfBirthInput, GenderInput } from './InputField';
import Terms from './Terms';
import SubmitButton from './SubmitButton';
import SignUpLoginLink from './SignUpLoginLink';
import './SignUpForm.css';
const SignUpForm = () => {
  return (
    <div className="signup-box">
      <Logo />
      <Title />
      <form>
        <FirstNameInput />
        <LastNameInput />
        <EmailInput />
        <PasswordInput />
        <DateOfBirthInput />
        <GenderInput />
        <Terms />
        <SubmitButton />
      </form>
      <SignUpLoginLink />
    </div>
  );
}

export default SignUpForm;
