import './App.css';
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Layout from './layout';
import IndexPage from './Components/IndexPage';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import { UserContextProvider } from './userContext';
import CreateNewPost from './Components/CreateNewPost';
import PostPage from './Components/postPage.js';
import EditPost from './Components/EditPost.js';

function App() {
  return (
    <UserContextProvider>
      <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />}/>
        <Route path='/create' element={<CreateNewPost />} />
        <Route path='/post/:id' element={<PostPage />} />
        <Route path='/edit/:id' element={<EditPost />} />
      </Route>
    </Routes>
    </UserContextProvider>

    
  );
}

export default App;
