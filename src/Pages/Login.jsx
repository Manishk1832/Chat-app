import React ,{useState, useEffect}from 'react'
import styled from 'styled-components'
import { Link , useNavigate} from 'react-router-dom'
import Logo from '../assets/Logo.png'
import {ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {loginRoute } from '../utils/APIRoutes';
import Register from './Register';

const Login = () => {
    const navigate = useNavigate()


    const [values, setValues] = useState({
        username: "",
        password: ""

    })

    useEffect(()=>{
      if(localStorage.getItem('chat-app-user')){
        navigate('/')
      }
      
    },[])

    const handleSubmit =  async(e)=>{
        e.preventDefault();
        handleValidation()
        if(handleValidation()){
            const {password,username} = values;
            const {data} = await axios.post(loginRoute, {
                username,
                password,
            });

            if(data.status === false){
                toast.error(data.msg, toastOptions);
            }
            if(data.status === true){
                console.log(data)
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                toast.success(data.msg, toastOptions);
                
                navigate("/");
            }
  
        }


    }

    const toastOptions =           
        {
            position: "top-right",
            autoClose: 5000,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        }
    

    const handleValidation = () =>{
        const {password,  username} = values;
        if(password === ""){
            toast.error("Username and Password required", toastOptions);
            return false;
        }
        else if(username.length === ""){
          toast.error("Username and Password required", toastOptions);
          return false;
        }
       
        return true;

    }
    
    const handleChange = (e)=>{
        setValues({...values, [e.target.name]: e.target.value});
    }


  return (
    <>
    <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="brand">
                <img src={Logo} alt="Logo" />
                <h1>Chat App</h1>
            </div>
            <input type="text"
             placeholder='Username'
             name='username'
             onChange={(e) => handleChange(e)}
             min={3}
            />
            
             <input type="password"
             placeholder='Password'
             name='password'
             onChange={(e) => handleChange(e)}
            />
           
            <button type='submit'> Login</button>
            <span> Don't have an account ? <Link to="/register">Register</Link>
            </span>

        </form>

    </FormContainer>
    <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
gap:1rem;
align-items: center;
justify-content: center;
background-color: #2D3250;
.brand{
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img{
        height: 5rem; 
        mix-blend-mode: multiply;

    }
    h1{
        color: white;
        text-transform: uppercase;
    }
}
form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #424769;
    border-radius: 1rem;
    padding: 3rem 5rem;
    input{
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #ECF4D6;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus{
            border: 0.1rem solid #ECF4D6;
            outline: none;
        }
    }
    button{
        background-color: #265073;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color: #7077A1;
        }
    }
    span{
        color: white;
        text-transform: uppercase;
        a {
            color: #33186B;
            text-decoration: none;
            font-weight: bold;
        }
    }
}
`;

export default Login