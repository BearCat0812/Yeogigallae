<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import Home from './pages/Home'
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Login from './components/Login';
import MyPage from './components/MyPage';
import Regist from './components/Regist';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes

function App() {
  return (
<<<<<<< Updated upstream
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  )
=======
=======

function App() {
  return (
>>>>>>> Stashed changes
=======

function App() {
  return (
>>>>>>> Stashed changes
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Regist" element={<Regist />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}

export default App;
