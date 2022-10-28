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
      data.user.avatarImage =
        'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMzEgMjMxIj48cGF0aCBkPSJNMzMuODMsMzMuODNhMTE1LjUsMTE1LjUsMCwxLDEsMCwxNjMuMzQsMTE1LjQ5LDExNS40OSwwLDAsMSwwLTE2My4zNFoiIHN0eWxlPSJmaWxsOiNiMzAwM2U7Ii8+PHBhdGggZD0ibTExNS41IDUxLjc1YTYzLjc1IDYzLjc1IDAgMCAwLTEwLjUgMTI2LjYzdjE0LjA5YTExNS41IDExNS41IDAgMCAwLTUzLjcyOSAxOS4wMjcgMTE1LjUgMTE1LjUgMCAwIDAgMTI4LjQ2IDAgMTE1LjUgMTE1LjUgMCAwIDAtNTMuNzI5LTE5LjAyOXYtMTQuMDg0YTYzLjc1IDYzLjc1IDAgMCAwIDUzLjI1LTYyLjg4MSA2My43NSA2My43NSAwIDAgMC02My42NS02My43NSA2My43NSA2My43NSAwIDAgMC0wLjA5OTYxIDB6IiBzdHlsZT0iZmlsbDojZmZjMWMxOyIvPjxwYXRoIGQ9Im04OC4xOCAxOTQuMTFjLTQuMjA3OSAxLjAyMS04LjM1NDUgMi4yNzkyLTEyLjQyIDMuNzY5NXYyNi4wNzJhMTE1LjUgMTE1LjUgMCAwIDAgNzkuNDggMHYtMjYuMDcyYy00LjA4NTgtMS40OTA0LTguMjUyOS0yLjc0ODYtMTIuNDgtMy43Njk1djguNzA1MWMwIDkuMzg4OC03LjYxMTIgMTctMTcgMTdoLTIwLjU4Yy05LjM4ODggMC0xNy03LjYxMTItMTctMTd2LTguNzA1MXoiIHN0eWxlPSJmaWxsOiM0OTFmNDk7Ii8+PHBhdGggZD0ibTEzNy4zOCAxMS4xNDhjLTEyLjIzIDEuOTU5My0xOC41MTEgMTQuNjA2LTQzLjQzNiA5LjQ5MTUtMTEuMjg1LTMuMjA1NC0xNi40MDYtMy41NzMtMjAuMzg5IDAuNTg1OTQtNC4xNTQ4IDQuMzM4NC03LjAzMyAxMi40MzUtOS44MTg0IDIxLjcwNi0yLjEzNTQgNy40MTM2LTMuNzE4NyAxNC4zODEtNC43NDYxIDIxLjY0NmgxMTIuN2MtMy40ODc4LTI0LjI5My0xMC44MjItNDMuMjgxLTI1LjE4Mi01MS4wNjEtMy41MzE0LTEuNjIzLTYuNTI3NC0yLjI5NTktOS4xMjg5LTIuMzYxM3oiIHN0eWxlPSJmaWxsOiMzMzM7Ii8+PHBhdGggZD0ibTExNC4zNyA0My4zODNjLTE5LjQ0NSAwLjA4OC0zOC41MjQgMi4wNzI0LTUyLjM3OSA1LjY5OTItMS4yNzY2IDQuNTc5NS0yLjQzMTcgMTAuMTY5LTMuMjI4NSAxNi44MDdoMTEzLjExYy0wLjgzNzMxLTYuMDEwNy0xLjkxNjQtMTEuNjc0LTMuMzE4NC0xNi45MjQtMTUuMjI5LTMuODg0Mi0zNC44NzMtNS42NjkzLTU0LjE4LTUuNTgyeiIgc3R5bGU9ImZpbGw6I2FmYWZhZjsiLz48cGF0aCBkPSJtMTE1LjUgNTUuNzczYy01OC4zOSAwLTEwNS43MyAxNS40NzYtMTA1LjczIDM0LjU3aDAuMDMxMmMwIDExLjI5NSAxNi40OTYgMjEuMzE5IDQyLjEyNiAyNy42MjctMC4xMDMzMS03Ljc3MDQgMi43ODgtMjEuOTA0IDUuMjczNC0zMS4wMzEgNi4wOTM1LTEuNzE2OCA2LjkyOTQtMS44OTcxIDEzLjE2Ny0yLjk5MTkgMTQuODc0LTIuODI1NiAyOS45OS00LjIwMzcgNDUuMTMzLTQuMTE1MyAxNS4xNDMtMC4wODg0IDMwLjI1OSAxLjI4OTcgNDUuMTMzIDQuMTE1MyA2LjIzNzIgMS4wOTQ3IDcuMjA2NSAxLjI3NTEgMTMuMyAyLjk5MTkgMi40ODU0IDkuMTI2NyA1LjM3NjggMjMuMjYgNS4yNzM0IDMxLjAzMSAyNS42My02LjMwODIgNDEuOTkzLTE2LjMzMiA0MS45OTMtMjcuNjI3aDAuMDMxMmMwLTE5LjA5My00Ny4zNC0zNC41Ny0xMDUuNzMtMzQuNTd6IiBzdHlsZT0iZmlsbDojMjIyOyIvPjxwYXRoIGQ9Im03Mi4wODggODMuNTMzYy02Ljk3NjUgMS4xMTQ3LTEzLjM1NyAyLjg1Ni0xOC40MzkgNC4zNDc3LTEuMTg2MSA3LjQxNS0yLjAwMzggMTguODU4LTEuODkyNiAyNi4yOTMgNC4zMjc4LTAuNjI3OTUgMTAuMTU1LTEuMzY0NCAxMy4yOTUtMS42NDY1LTAuNDA1NTQgMC4zMDE5OCAyLjczNDQtMTcuODI3IDcuMDM3MS0yOC45OTR6bTg2LjgyNCAwYzQuMzAyOCAxMS4xNjcgNy40NDI2IDI5LjI5NiA3LjAzNzEgMjguOTk0IDMuMTM5NiAwLjI4MjEzIDguOTY3MSAxLjAxODUgMTMuMjk1IDEuNjQ2NSAwLjExMTE5LTcuNDM1MS0wLjcwNjUyLTE4Ljg3OC0xLjg5MjYtMjYuMjkzLTUuMDgyMi0xLjQ5MTYtMTEuNDYzLTMuMjMyOS0xOC40MzktNC4zNDc3eiIgc3R5bGU9ImZpbGw6IzZkM2ExZDsiLz48cGF0aCBkPSJtMTMxLjY0IDExNC4wOSA3LjU4MDEtNy41ODAxIDcuNTgwMSA3LjU4MDFtLTYyLjYgMCA3LjU4MDEtNy41ODAxIDcuNTc5OSA3LjU4MDEiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDo2LjQ5OThweDtzdHJva2U6IzAwMDsiLz48cGF0aCBkPSJtOTcuMDYgMTQ0LjU5YTIwLjE1IDIwLjE1IDAgMCAwIDM2Ljg4IDQuNTN6IiBzdHlsZT0iZmlsbDojZmZmO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6Mi45OTk5cHg7c3Ryb2tlOiMwMDA7Ii8+PC9zdmc+';
      data.user.isAvatarImageSet = true;
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
