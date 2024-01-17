import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import Contacts from "../Components/Contacts";
import { getAllUsersRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import Welcome from "../Components/Welcome";
import ChatContainer from "../Components/ChatContainer";
import { host } from "../utils/APIRoutes";
import {io} from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem("chat-app-user")) {
          navigate("/login");
        } else {
          setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
          setIsLoaded(true);

        }
      } catch (error) {
        console.log(error);}
    };
  
    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
    
  },[currentUser])
  

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (currentUser) {
          if (currentUser.isAvatarImageSet) {
            const data = await axios.get(`${getAllUsersRoute}/${currentUser._id}`);
            setContacts(data.data);
          } else {
            navigate("/setAvatar");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchContacts();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) =>{   
     setCurrentChat(chat);
  }
  

  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} currentUser={currentUser}  changeChat = {handleChatChange}/>
          {
            isLoaded && currentChat === undefined ?(
            <Welcome currentuser={currentUser}/> 
            ):
            (
              <ChatContainer currentchat={currentChat} currentuser={currentUser} socket={socket}/>
            )
          }
        </div>
       
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #2d3250;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 85%;

  }
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #424769;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
