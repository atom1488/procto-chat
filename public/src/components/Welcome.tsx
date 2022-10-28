import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import welcomeImage from '../assets/robot.png';

export default function Welcome() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    (async () => {
      setUserName(await JSON.parse(localStorage.getItem('procto-chat-user')!).username);
    })();
  }, [userName]);

  return (
    <Container>
      <img src={welcomeImage} alt="welcomeImage" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to start messaging</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  img {
    height: 20rem;
    span {
      color: #40efff;
    }
  }
`;
