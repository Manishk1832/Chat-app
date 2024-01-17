import React from 'react'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components';
import axios from 'axios';
import {IoIosLogOut} from 'react-icons/io'

export default function Logout() {
    const navigate = useNavigate();
    const handleCick = async()=>{
        localStorage.clear();
        navigate("/login");
    }
  return (
    <Button onClick={handleCick}>

        <IoIosLogOut  style={{color:'white',fontSize:'2rem',cursor:'pointer'}}/>

    </Button>
  )
}

const Button = styled.button`
display:flex;
justify-content:center;
align-items:center;
padding:0.5rem;
border-radius:0.5rem;
background-color:#9a86f3;
border:none;
cursor:pointer;
 svg{
    font-size:1.3rem;
    color: #ebe7ff;
 }



`
