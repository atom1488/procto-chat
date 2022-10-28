import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import axios from 'axios';

import logo from '../assets/logo.svg';
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../utils/APIRoutes';
import styled from 'styled-components';

const ToastOptionsObject: ToastOptions = {
  position: 'top-right',
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
};

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('procto-chat-user')) {
      navigate('/');
    }
  }, [navigate]);

  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!handleValidation()) {
      return;
    }

    const { username, password } = values;

    const { data } = await axios.post(loginRoute, {
      username,
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
    const { password, username } = values;
    if (!username.length) {
      toast.error('Username is required.', ToastOptionsObject);
      return false;
    }
    if (!password.length) {
      toast.error('Password is required.', ToastOptionsObject);
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
          <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} min="3" />
          <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
          <button type="submit">Login</button>
          <span>
            Don't have an account ? <Link to="/register">Register</Link>
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

export default LoginPage;
