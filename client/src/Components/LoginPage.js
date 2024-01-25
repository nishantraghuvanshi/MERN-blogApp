import React, { useState } from 'react';
import { UserContext } from '../userContext';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const {setUserInfo} = React.useContext(UserContext);
    async function Login(ev){
        ev.preventDefault();
        const response=await fetch('http://localhost:4000/login', {
            method:'POST',
            body: JSON.stringify({username,password}),
            headers:({'Content-Type':'application/json'}),
            credentials:'include',
        });
        if(response.ok){
            response.json().then(userInfo=>{
                setUserInfo(userInfo);
                setIsLogin(true);
                window.location.href='/';
            })
            
        }else{
            alert('Wrong username or password');
        }
    
    }
    return (
        <div>
            <form className="login" onSubmit={Login}>
                <h1 className='text-2xl font-bold'>Login</h1>
                <input type="text" 
                placeholder="Username" 
                value={username}
                onChange={ev=>setUsername(ev.target.value)}/>
                <input type="password" 
                placeholder="Password"
                value={password}
                onChange={ev=>setPassword(ev.target.value)} />
                <button type="submit" className='bg-black'>Login</button>
            </form>
        </div>
    )
}