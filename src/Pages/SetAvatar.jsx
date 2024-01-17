import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/Loader.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions =           
  {
      position: "top-right",
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
  }

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user"))
      navigate("/login");
  }, []);
  const setProfilePicture = async () => {
    try {
      if (selectedAvatar === undefined) {
        toast.error("Please select an avatar", toastOptions);
      } else {
        const user = await JSON.parse( localStorage.getItem("chat-app-user") );
  
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        });
  
        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem(
              "chat-app-user",
            JSON.stringify(user)
          );
          toast.success("Profile picture set successfully", toastOptions);
          navigate("/");
        } else {
          toast.error("Error setting avatar. Please try again.", toastOptions);
        }
      }
      
    }
    catch(error){
      toast.error(error.response.data.msg, toastOptions);
    }
   
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        for (let index = 0; index < 4; index++) {
          const image = await axios.get(
            `${api}${Math.round(Math.random() * 1000)}`
          );
          const base64 = btoa(image.data);
          data.push(base64);
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [api]);

  

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
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
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #2D3250;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 40%;
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
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
