import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Regist from './pages/Regist.jsx';
import MyPage from './pages/MyPage.jsx';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;