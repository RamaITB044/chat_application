import React,{useState,useEffect} from 'react'
import styled from "styled-components"
import {toast,ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { NavLink,useNavigate } from 'react-router-dom';
import axios from "axios"
import Logo from "../assets/logo.svg"
import { loginRoute } from '../utils/APIRoutes';
const FormContainer = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap:1rem;
    background-color:#131324;

    .brand
    {
        display:flex;
        align-items:center;
        gap:1rem;
        justify-content:center;
        img
        {
            height:5rem;
        }
        h1
        {
            color:#fff;
            text-transform:uppercase;
        }
    }
    form
    {
        display:flex;
        flex-direction:column;
        gap:2rem;
        background-color:#00000076;
        border-radius:1rem;
        padding:3rem 5rem;
        input
        {
            background-color:transparent;
            padding:1rem;
            border:0.11rem solid #4e0eff;
            border-radius:0.4rem;
            color:#fff;
            width:100%;
            font-size:1rem;
            &:focus
            {
                border: 0.1rem solid #997af0;
                outline:none;
            }
        }
        button
        {
            background-color:#653bdb;
            color:#fff;
            padding:1rem 2rem;
            border:none;
            font-weight:bold;
            cursor:pointer;
            border-radius:0.4rem;
            font-size:1rem;
            text-transform:uppercase;
            transition: .3s ease-in-out;
            &:hover
            {
                background-color:#4618c7;
            }
        }
        span
        {
            color:#fff;
            text-transform:uppercase;
            a{
                color:#4e0eff;
                letter-spacing:.05rem;
                font-weight:bold;
                text-decoration:none;
                padding-left:.3rem
            }
        }
    }
`;
function Login() {

    const navigateTo = useNavigate();


    const [formData,setFormData] = useState({
        username:"",
        password:"",
    })

    const handleChange = e =>{
        const {name,value} = e.target;
        setFormData(prevFormData=>{
            return{
                ...prevFormData,
                [name]:value
            }
        })
    }



    const toastStyle = {
        theme:"dark",
        position: "bottom-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
}

    const handleValidation = () =>{
        const {username,password} = formData;
        if(password === "")
        {
            toast.error("Password can't be empty.",toastStyle)
            return false;
        }
        else if(username === "")
        {
            toast.error("User name can not be empty.",toastStyle)
            return false;
        }
        
        return true;
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
      if( handleValidation())
      {
        const {username,password} = formData;
        const {data} = await axios.post(loginRoute,{
            username,password
        })


       if( data.status === false) 
            toast.error(data.message) 
        else
         {
            localStorage.setItem("chat-app-user",JSON.stringify(data.newUser))
            // navigateTo("/")
        }
      }
    }

    useEffect(()=>{
        if(localStorage.getItem("chat-app-user"))
            navigateTo("/")
    },[])


  return (
   <>
    <FormContainer>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="brand">
                <img src={Logo} alt="logo" />
                <h1>Lappy</h1>
            </div>
            <input type="text" 
            name="username" 
            value={formData.username}
            placeholder='User Name' 
            min="3"
            onChange={e=>handleChange(e)}/>


<input type="password" 
            value={formData.password}
            name="password" 
            placeholder='Password' 
            onChange={e=>handleChange(e)}/>


<button type='submit'>Login</button>
<span>New User ?  <NavLink to="/register">Create an Account</NavLink></span>
        </form>
    </FormContainer>
    <ToastContainer />
   </>
  )
}

export default Login