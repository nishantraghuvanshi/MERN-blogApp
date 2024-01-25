import { useEffect, useState } from "react";
import Post from "./post";

export default function IndexPage() {
    const [posts,setPosts]= useState([]);
    useEffect(()=>{
        fetch('http://localhost:4000/post').then(response=>{
            response.json().then(Posts=>{
                setPosts(Posts);
            })
        })
    },[])
    if (posts.length === 0) {
        return <div className="text-4xl font-bold text-center">No Posts</div>;
    }
    return (<>
        {posts.map(post => {
            return <Post {...post}/>
        })}
    </>)
}