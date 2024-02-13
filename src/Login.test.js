import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './App/components/LoginForm';
import InputField from './App/components/InputField';
import CreateAccount from './App/components/CreateAccount';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Test functions', () => {
    test('handleChange function in InputField', () => {
      const onChangeMock = jest.fn();
      const value = 'test value';
  
      render(<InputField type="text" placeholder="Username" value={value} onChange={onChangeMock} />);
  
      fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'new value' } });
  
      expect(onChangeMock).toHaveBeenCalledWith('new value');
    });
  });
  
  describe('Component Test 1', () => {
    test('LoginForm renders correctly and captures user input', () => {
      render(
        <Router>
          <LoginForm />
        </Router>
      );
  
      // Test input fields and submit button rendering
      expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
      expect(screen.getByText('Log In')).toBeInTheDocument();
  
      // Test capturing user input
      fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testUser' } });
      fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'testPassword' } });
  
      expect(screen.getByPlaceholderText('Username').value).toBe('testUser');
      expect(screen.getByPlaceholderText('Password').value).toBe('testPassword');
    });
  });
  
  describe('Component Test 2', () => {
    test('CreateAccount renders correctly and contains SignUpLink', () => {

      render(
        <Router>
          <CreateAccount />
        </Router>
      );
      // test rendering of CreateAccount component
      expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
      
      // test rendering of SignUpLink within CreateAccount
      expect(screen.getByText('Sign up')).toBeInTheDocument();
    });
  });
  
  describe('Component Test 3', () => {
    test('InputField renders correctly and handles user input', () => {
      const onChangeMock = jest.fn();
      const value = 'test value';
  
      render(<InputField type="text" placeholder="Test" value={value} onChange={onChangeMock} />);
  
      expect(screen.getByPlaceholderText('Test')).toBeInTheDocument();
  
      // test handling user input
      fireEvent.change(screen.getByPlaceholderText('Test'), { target: { value: 'new value' } });
  
      expect(onChangeMock).toHaveBeenCalledWith('new value');
    });
  });