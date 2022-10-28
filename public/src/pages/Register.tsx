import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import axios from 'axios';

import logo from '../assets/logo.svg';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/APIRoutes';
import styled from 'styled-components';

const ToastOptionsObject: ToastOptions = {
  position: 'top-right',
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
};

function RegisterPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('procto-chat-user')) {
      navigate('/');
    }
  }, [navigate]);

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!handleValidation()) {
      return;
    }

    const { username, email, password } = values;

    const { data } = await axios.post(registerRoute, {
      username,
      email,
      password,
    });

    if (data.status === false) {
      toast.error(data.msg, ToastOptionsObject);
    }
    if (data.status === true) {
      localStorage.setItem('procto-chat-user', JSON.stringify(data.user));
      navigate('/');
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error('Password and Comfirm Password should be the same.', ToastOptionsObject);
      return false;
    }
    if (username.length < 3) {
      toast.error('Username should be greater than 3 characters.', ToastOptionsObject);
      return false;
    }
    if (password.length < 6) {
      toast.error('Password should be at least 6 characters.', ToastOptionsObject);
      return false;
    }
    if (email === '') {
      toast.error('Email is required', ToastOptionsObject);
      return false;
    }
    if (username.includes(' ')) {
      toast.error("Username can't contain spaces.", ToastOptionsObject);
      return false;
    }
    return true;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h1>ProctoChat</h1>
          </div>
          <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} />
          <input type="email" placeholder="Email" name="email" onChange={(e) => handleChange(e)} />
          <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #141414;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #008080;
      border-radius: 0%.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #00e0b0;
        outline: none;
        transition: 0.2s ease-in-out;
      }
    }
    button {
      background-color: #007d7d;
      color: white;
      padding: 1rem 2rem;
      font-weight: bold;
      border: none;
      border-radius: 0.4rem;
      cursor: pointer;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #005f4f;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #008080;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
`;

export default RegisterPage;
