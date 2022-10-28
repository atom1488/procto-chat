import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import { setAvatarRoute } from '../utils/APIRoutes';

const ToastOptionsObject: ToastOptions = {
  position: 'top-right',
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
};

export default function Contacts({ contacts, currentUser, changeChat }: any) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState<number | undefined>(undefined);

  const inputRef = useRef<any>();
  const triggerFileSelectPopup = () => inputRef.current.click();

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index: number, contact: any) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const checkImage = async (file: FileReader) => {
    var image = new Image();
    image.src = file.result! as string;
    var width = image.width;
    var height = image.height;
    return { width, height };
  };

  const onSelectFile = (event: any) => {
    (async () => {
      if (event.target.files && event.target.files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = async () => {
          var image = await checkImage(reader);
          if (image.width === 0 || image.height === 0) {
            return toast.error('Error, try again!', ToastOptionsObject);
          }
          if (image.width !== 128 || image.height !== 128) {
            return toast.error('Avatar must be 128x128.', ToastOptionsObject);
          }
          const result = reader.result!.toString().substring(22);
          await axios.post(`${setAvatarRoute}/${currentUser._id}`, {
            image: result,
          });
          const user = await JSON.parse(localStorage.getItem('procto-chat-user')!);
          user.avatarImage = result;
          localStorage.setItem('procto-chat-user', JSON.stringify(user));
          window.location.reload();
        };
      }
    })();
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h3>ProctoChat</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact: any, index: number) => {
              return (
                <div
                  className={`contact${index === currentSelected ? ' selected' : ''}`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <div className="add-avatar" onClick={triggerFileSelectPopup}></div>
              <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
              <input type="file" accept="image/*" ref={inputRef} onChange={onSelectFile} style={{ display: 'none' }} />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #041420;
  .add-avatar {
    padding: 2rem;
    position: fixed;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 3.4rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #9be3ff48;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.3s ease-in-out;
      .avatar {
        img {
          height: 3rem;
          border-radius: 50%;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #008080;
    }
  }
  .current-user {
    background-color: #044a4a;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        border-radius: 50%;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
