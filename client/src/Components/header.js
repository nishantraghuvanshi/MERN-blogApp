import { Link } from "react-router-dom";
import React,{useEffect} from 'react';
import { UserContext } from "../userContext";

export default function Header() {
  const {setUserInfo,userInfo} = React.useContext(UserContext);
  useEffect(()=>{
    fetch('http://localhost:4000/profile',{
      credentials:'include',
  }).then(response=>{
      if(response.ok){
          return response.json();
      }else{
          throw new Error('Failed to fetch');
      }
  }).then(userInfo=>{
      setUserInfo(userInfo);
  }).catch(error=>{
      console.log(error);
  })

},[setUserInfo])
function logout(){
  fetch('http://localhost:4000/logout',{
    credentials:'include',
    method:'POST',
  })
  setUserInfo(null);
}
const username = userInfo?.username;

    
  return (
        <header className="bg-black text-white rounded-lg ">
        <Link to="/" className="logo">My Blog</Link>
        <nav>
          {username ? (
            <>
            <Link to="/create">New Post</Link>
            <Link onClick={logout}>Logout</Link></>
          ):
          (<>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link></>)}
          
        </nav>
      </header>
    );
}