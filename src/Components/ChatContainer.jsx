import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";
import { sendMessageRoute } from "../utils/APIRoutes";
import { getAllMessagesRoute } from "../utils/APIRoutes";
import {v4 as uuidv4} from 'uuid'

export default function ChatContainer({ currentchat, currentuser, socket }) {
  const [messages, setmessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentuser._id,
          to: currentchat._id,
        });
        if (response.status === 200) {
          setmessages(response.data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
  
    let isMounted = true;
    if (isMounted) {
      fetchData();
    }
  
    return () => {
      isMounted = false;
    };
  }, [currentchat, currentuser]);
  

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentuser._id,
      to: currentchat._id,
      msg: msg,
    });
    socket.current.emit("send-msg", {
      to: currentchat._id,
      from: currentuser._id,
      msg: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setmessages(msgs);
  };
  

  useEffect(() => {
    if (socket.current) {
        socket.current.on("msg-recieve",(msg)=>{
            setArrivalMessage({fromSelf:false, message: msg});
        })
        
    }
  },[])

  useEffect(() => {
    arrivalMessage && setmessages((prev) => [...prev, arrivalMessage]);
  },[arrivalMessage])


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])

  return (
    <>
      {currentchat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentchat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentchat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages" >
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Messages />

          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 75% 10%;
  gap: 0.1rem;
  overflow: hidden;
  padding-bottom: 2rem;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
  }
  .user-details {
    display: flex;
    align-items: center;
    gap: 1rem;

    .avatar {
      img {
        height: 3rem;
      }
    }
    .username {
      h3 {
        color: white;
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
