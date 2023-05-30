import React,{useState,useEffect} from 'react'
import styled from "styled-components"
import {toast,ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import {Buffer} from "buffer"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Loader from "../assets/loader.gif"
import { setAvatarRoute } from '../utils/APIRoutes';

const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
gap:3rem;
background-color:#131324;
height:100vh;
width:100vw;
.loader
{
  max-inline-size:100%;
}
.title-container
{
  h1
  {
    color:#fff;
  }
}
.avatars
{
  display:flex;
  gap:2rem;
  .avatar
{
  border: 0.4rem solid transparent;
  padding:0.4rem;
  border-radius: 5rem;
  display:flex;
  justify-content:center;
  align-items:center;
  transition: 0.5s ease-in-out;
  img
  {
    height:6rem;
    cursor:pointer;
  }
}
.selected
{
  border: 0.4rem solid #4e0eff;
}
}
.submit-btn
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
`;


const SetAvatar = () => {
  const navigateTo = useNavigate();
  const api = "https://api.multiavatar.com/45678945";
  const [avatars,setAvatars] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [selectedAvatar,setSelectedAvatar] = useState(undefined);

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

  const setProfilePicture = async() => {
    if(selectedAvatar === undefined)
      toast.error("Please select an avatar",toastStyle);
    else
    {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
        image:avatars[selectedAvatar],
      });

      if(data.isSet)
      {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user",JSON.stringify(user));
        navigateTo("/")
      }
      else
      {
        toast.error("Error setting avatar,Pleasetry again later",toastStyle);
      }


    }
  };

  useEffect(()=>{
    async function fetchImage (){
      const data = [];
    for(let i = 0;i<5;i++)
    {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
    }  
    fetchImage();
  },[])

  return (
    <>
      {
        isLoading ? <Container>
          <img src={Loader} alt="loader" className='loader' />
        </Container> :
        <Container>
        <div className="title-container">
          <h1>Pick an avatar as your profie picture</h1>
        </div>
        <div className="avatars">
          {
              avatars.map((avatar,index)=>{
                return(
                  <div className={`avatar ${selectedAvatar === index ? "selected" :""}`} key = {index}>
                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={()=>setSelectedAvatar(index)}/>
                  </div>
                )
              })
          }
        </div>
        <button className='submit-btn' onClick={setProfilePicture}>Set As  profile picture</button>
    </Container>
      }
      <ToastContainer />
    </>
  )
}

export default SetAvatar