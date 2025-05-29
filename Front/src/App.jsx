import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Regist from './pages/Regist.jsx';
import MyPage from './pages/MyPage.jsx';
import Select from './pages/Select.jsx';
import About from './pages/About.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 페이지 새로고침 후에도 로그인 상태 유지
  useEffect(() => {
    const storedName = sessionStorage.getItem('name');
    if (storedName) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/select" element={<Select />} />
        <Route path="/About" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;