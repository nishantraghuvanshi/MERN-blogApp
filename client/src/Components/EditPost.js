import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import Editor from './Editor';

const EditPost = () => {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');  
    const [reDirect, setreDirect]=  useState(false);


    useEffect(() => {
        async function getPost(){
            await fetch(`http://localhost:4000/post/${id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                  'Access-Control-Allow-Origin': 'http://localhost:3000',
                }
            }).then(res => res.json().then(data => {
                setTitle(data.title);
                setSummary(data.summary);
                setContent(data.content);
                setFiles(data.cover);
            }));
        }
        getPost();
    }, [])


    async function editPost(ev){
        ev.preventDefault(); 
        const data= new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if(files){
            data.set('file', files[0]);
        }
        await fetch(`http://localhost:4000/post`, {
            method: 'PUT',
            body: data,
            credentials: 'include',
            headers: {
              'Access-Control-Allow-Origin': 'http://localhost:3000',
            }
        }).then(res => res.json().then(data => {
            if(data.ok){
                alert('Post updated');
                setreDirect(true);
            }else{
                alert('Failed to update post');
            }
        }));
    }

    if(reDirect){
    window.location.href='/post/'+id;
    setreDirect(false);
   }
    return (
        <div>
            <form onSubmit={editPost}>
                <h1>Edit Post</h1>
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
                <button type="submit" className='bg-black my-2'>Edit Post</button>
            </form>
        </div>
    )
}

export default EditPost