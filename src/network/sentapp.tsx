import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Nav from "../navbar/navbar"
// import Skillcomponent from "./searchbox";
// import "./skill.css"
import { ToastContainer, toast } from 'react-toastify';
import None from "./components/nonecomponent"
import SentComponent from "./components/sentcomponent"
import BaseUrl from "../BaseUrl";

const Recieved = () => {

//   const [reload,setreload] = useState(false);
  const [searchres,setsearchres] = useState([]);
  const [none,setnone] = useState(true)

  useEffect(()=>{BaseUrl.get("/network/connection/request/send/",config)
    .then((res)=>{
        console.log(res);
        setsearchres(res.data);
        if(res.data.length!==0)
        setnone(false);
        else
        setnone(true);
    })
    .catch((err)=>{
        console.log(err)
    })
})

  const Navhandler= useNavigate();
  const activestyle={
    color:'#A950FB' ,
    borderLeft:'3px solid #A950FB',
   
}
var accesstoken=localStorage.getItem("accesstoken");

const config ={
  headers:{
    Authorization:`Bearer ${accesstoken}`,
  }
}


  return (
    <div>
      <Nav />
      <div id="account_nav">
        <p onClick={()=>{Navhandler("/network/recieved"); } }   >Invitations Recieved</p>
        <p onClick={()=>{Navhandler("/network/sent"); } } style={activestyle} >Invitations sent</p>
        <p onClick={()=>{Navhandler("/network/connection"); } } >Connections</p>
        <p   onClick={()=>{Navhandler("/network/followers"); } }>Followers</p>
        <p onClick={()=>{Navhandler("/network/following"); } }>Following</p>
      </div>
      <div  style={{height:"auto"}} id="skill">
        <p>Invitations Sent</p>
        {none ? <None showtext="No Pending Invitations" />: 
        <div style={{marginTop:"2vh"}}>
          {searchres.map((data)=>{return <SentComponent data={data}/>})}
        </div> }
      </div>
      <ToastContainer position="top-center" theme="dark" />
    </div>
  );
};

export default Recieved;
