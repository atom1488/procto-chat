import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import loader from '../assets/loader.svg';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { setAvatarRoute } from '../utils/APIRoutes';
import styled from 'styled-components';

function SetAvatar() {
  const api = `https://api.multiavatar.com/1488`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState<number | undefined>(undefined);

  const ToastOptionsObject: ToastOptions = {
    position: 'top-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(() => {
    async function checkStorage() {
      if (!localStorage.getItem('procto-chat-user')) navigate('/login');
    }
    checkStorage();
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Please select an avatar', ToastOptionsObject);
    } else {
      const user = await JSON.parse(localStorage.getItem('procto-chat-user')!);

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('procto-chat-user', JSON.stringify(user));
        navigate('/');
      } else {
        toast.error('Error setting avatar. Please try again.', ToastOptionsObject);
      }
    }
  };

  useEffect(() => {
    async function getImage() {
      const data: string[] = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
        const buffer = new Buffer(image.data);
        data.push(buffer.toString('base64'));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    getImage();
  }, [api]);
  return (
    <>
      {isLoading ? (
        <SetAvatarContainer>
          <img src={loader} alt="loader" className="loader" />
        </SetAvatarContainer>
      ) : (
        <SetAvatarContainer>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div key={avatar} className={`avatar${selectedAvatar === index ? ' selected' : ''}`}>
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </SetAvatarContainer>
      )}
    </>
  );
}

const SetAvatarContainer = styled.div`
  background-color: #131324;
  height: 100vh;
  gap: 3rem;
  width: 100vw;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.2rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.3s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #008080;
    }
  }
  .submit-btn {
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
`;

export default SetAvatar;