import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { UserContext } from '../userContext';

const PostPage = () => {
    const [postInfo, setPostInfo] = useState({}) 
    const {id} = useParams();
    let userName= postInfo.author ? postInfo.author.username : '';
    let post_id = postInfo.author ? postInfo.author._id : '';
    const userInfo = useContext(UserContext);
    const userInfo_id = userInfo ? userInfo.userInfo.id : '';

    async function getPost(){
      
        await fetch(`http://localhost:4000/post/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Access-Control-Allow-Origin': 'http://localhost:3000',
            }
        }).then(res => res.json().then(data => setPostInfo(data)));
    
    }

    useEffect(() => {
        getPost();
    }, [])

    async function deletePost(){
        await fetch(`http://localhost:4000/post/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
              'Access-Control-Allow-Origin': 'http://localhost:3000',
            }
        }).then(res => {
            if(res.ok){
                alert('Post deleted');
                window.location.href='/';
            }else{
                alert('Failed to delete post');
            }
        })
    }

    
    if (!postInfo) return (<div>Loading...</div>);
  return (
    <div className='post-page'>
      <h1 className='text-2xl font-bold text-center'>{postInfo.title}</h1>
      <p>by {userName}</p>
      {userInfo_id === post_id &&(
        <div >
            <Link to={`/edit/${id}`}>
              <button className='bg-slate-500 hover:bg-slate-400 my-2 '>Edit</button>
            </Link>
          <button className='bg-red-500 hover:bg-red-400 my-2' onClick={deletePost}>Delete</button>
        </div>
      )}
        <div className='image'>
            <img src={'http://localhost:4000/'+ postInfo.cover} alt="Random" />
        </div>
        <hr />
        <div dangerouslySetInnerHTML={{__html:postInfo.content}} />
    </div>
  )
}

export default PostPage