import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Regist from './pages/Regist.jsx';
import MyPage from './pages/MyPage.jsx';
import MyPageEdit from './pages/MyPageEdit.jsx';
import Select from './pages/Select.jsx';
import About from './pages/About.jsx';
import ScrollToTop from './ScrollToTop';
import DibsList from './pages/DibsList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 페이지 새로고침 후에도 로그인 상태 유지
  useEffect(() => {
    fetch('http://localhost:8080/session-check', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        if (res.loggedIn) {
          setIsLoggedIn(true);
        }
      });
  }, []);


  return (
    <div>
      <ScrollToTop />
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/mypage" element={<MyPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/mypage/edit" element={<MyPageEdit />} />
        <Route path="/select" element={<Select />} />
        <Route path="/About" element={<About />} />
        <Route path="/dibs" element={<DibsList />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;