import React, { useState } from 'react';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function RegisterPage(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        })
        if (response.ok) {
            alert('Register successfully');
        }else{
            alert('Register failed');
        }
    }
    return (
        <div>
            <form className="register" onSubmit={RegisterPage}>
                <h1 className='text-2xl font-bold'>Register</h1>
                <input type="text" 
                placeholder="Username" 
                value={username}
                onChange={ev => setUsername(ev.target.value)} />
                <input type="password" 
                placeholder="Password" 
                value={password}
                onChange={ev=> setPassword(ev.target.value)}/>
                <button type="submit" className='bg-black '>Register</button>
            </form>
        </div>
    )
}