import React from 'react';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import Editor from './Editor';


export default function CreateNewPost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');  
    const [reDirect, setreDirect]=  useState(false);

  async function createNewPost(ev){
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
    });
    if(response.ok){
            alert('Post created');
            setreDirect(true);
    }else{
            alert('Failed to create post');
    }
   }
   if(reDirect){
    window.location.href='/';
    setreDirect(false);
   }
    return (
        <div>
            <form onSubmit={createNewPost}>
                <h1 className='text-center text-2xl font-bold'>Create New Post</h1>
                <input type="title" 
                placeholder="Title"
                value={title}
                onChange={ev=>setTitle(ev.target.value)} />
                <input type="summary" 
                placeholder="Summary"
                value={summary}
                onChange={ev=>setSummary(ev.target.value)} />
                <input type="file" 
                onChange={ev=>setFiles(ev.target.files)}
                />
                <Editor value={content} onChange={setContent}/>
                <button type="submit" className='bg-black my-2'>Create Post</button>
            </form>
        </div>
    )
}