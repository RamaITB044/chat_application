import React,{useState,useEffect} from 'react'
import styled from "styled-components"
import {toast,ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { NavLink,useNavigate } from 'react-router-dom';
import axios from "axios"
import Logo from "../assets/logo.svg"
import { registerRoute } from '../utils/APIRoutes';
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
function Register() {

    const navigateTo = useNavigate();


    const [formData,setFormData] = useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:"",
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
        const {username,email,password,confirmpassword} = formData;
        if(password!== confirmpassword)
        {
            toast.error("Password and Confirm Password Must be Same.",toastStyle)
            return false;
        }
        else if(username.length <= 3)
        {
            toast.error("User name must me greater that 3 characters.",toastStyle)
            return false;
        }
        else if(password.length < 3)
        {
            toast.error("Password must contain 3 characters.",toastStyle)
            return false;
        }
        else if(email === "")
        {
            toast.error("Please enter a valid email.",toastStyle)
            return false;
        }
        return true;
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
      if( handleValidation())
      {
        const {username,email,password} = formData;
        const {data} = await axios.post(registerRoute,{
            username,email,password
        })


       if( data.status === false) 
            toast.error(data.message) 
        else
         {
            localStorage.setItem("chat-app-user",JSON.stringify(data.newUser))
            navigateTo("/")
        }
      }
    }


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
            onChange={e=>handleChange(e)}/>

<input type="email" 
            value={formData.email}
            name="email" 
            placeholder='User Email' 
            onChange={e=>handleChange(e)}/>

<input type="password" 
            value={formData.password}
            name="password" 
            placeholder='Password' 
            onChange={e=>handleChange(e)}/>

<input type="password" 
            value={formData.confirmpassword}
            name="confirmpassword" 
            placeholder='Confirm Password' 
            onChange={e=>handleChange(e)}/>

<button type='submit'>Create User</button>
<span>Already Have an Account? <NavLink to="/login">Login</NavLink></span>
        </form>
    </FormContainer>
    <ToastContainer />
   </>
  )
}

export default Register