import React,{useState} from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'
export default function ChatInput({handleSendMsg}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg , setMsg] = useState("");

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);

    }
    const handleEmojiClick = ( emoji, event) => {
        console.log(emoji);
        let message = msg;
        message += emoji.emoji; 
        setMsg(message);
    }

    const sendChat = (event) => {
        event.preventDefault();
        if(msg.length > 0){
            handleSendMsg(msg);
            setMsg("");
        }
    }
    
    
  return (
    <Container>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                {
                    showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>
                }

            </div>
        </div>
        <form className="input-container" onSubmit={(e) => sendChat(e)}>
            <input type="text" placeholder='type your message here'  onChange={ (event) => setMsg(event.target.value)} value={msg} />
            <button className='submit'>
                <IoMdSend/>
            </button>

        </form>




      
    </Container>
  )
}

const Container = styled.div`
display: grid;

grid-template-columns: 5% 95%;
align-items: center;
background-color: #424769;
padding: 0 2rem;
.button-container{
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji{
        position: relative;

        svg{
            font-size: 1.5rem;
            color: #ffff00c8;
            cursor: pointer;
            
        }
        .EmojiPickerReact {
            position: absolute;
            top: -470px;
            background-color: #424769; 
            box-shadow: 0 5px 10px #9a86f3;
            border-color: #918cff;
            .emoji-scroll-wrapper::-webkit-scrollbar{
                background-color: #080420;
                width: 5px;
                &-thumb{
                    background-color: #9a86f3;
                }
            }
           .emoji-category{
               filter:contrast(0);

           }
        }
        .emoji-search{
            background-color: transparent;
            border-color: #918cff;
        }
        .emoji-group:before{
            background-color: #080420;

        }
    }

}
.input-container{
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    height: 2.5rem;   
    background-color: #ffffff34;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0 1rem;
        gap: 1rem;

    }
    input{
        width: 90%;
        background-color: transparent;
        color: white;
        border: none;
        padding-left: 1rem;
        font-size: 1.5rem;
        &::selection{
            background-color: #918cff;
        }
        &:focus{
            outline: none;
        }
    }
    button{
        padding: 0.3rem 2rem;
        border-radius: 2rem;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background-color: #9a86f3;
        border: none;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            padding: 0.3rem 1rem;
           
        }
        svg{
            font-size: 2rem;
            color: white;
        }
      
        
    }
}



`
