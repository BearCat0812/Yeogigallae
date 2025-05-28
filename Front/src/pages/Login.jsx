import React, { useState } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const login = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, pw }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.success == true) {
          console.log(res);
          sessionStorage.setItem("name", res.name); // Login.jsx의 id가 아니라 res.id를 받아와서 저장하도록 하자
          alert("Login Response Success");
          navigate('/select');
        } else {
          alert("Login Failed..");
        }
      });
  };

  return (
    <div className="login-container container">
      <form id="login-form">
        <div className="login-content">
          <img src="/images/logo.png" alt="여기갈래" />
        </div>

        <p>로그인</p>

        <div className="login-form-group">
          <input
            type="text"
            id="id"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div className="login-form-group">
          <input
            type={showPassword ? 'text' : 'password'}
            id="pw"
            placeholder="패스워드"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <i
            className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} fa-lg`}
            onClick={togglePassword}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div className="login-form-group login-check">
          <input type="checkbox" id="remember-check" />
          <label htmlFor="remember-check">아이디 저장하기</label>
        </div>

        <div className="login-form-group">
          <button type="submit" id="login" onClick={login}>
            로그인
          </button>
        </div>

        <div className="login-form-group login-menu">
          <button type="button" className="regist-button" onClick={() => navigate('/regist')}>
            가입하기
          </button>
          <a href="#">비밀번호를 잊어버리셨나요?</a>
        </div>

        <div className="login-form-group etc">또는</div>

        <div className="login-form-group login-form-group-container">
          <button id="k-login">
            <img src="/images/kakao.svg" alt="kakao" />
            카카오로 시작하기
          </button>
          <button id="n-login">
            <img src="/images/naver.svg" alt="naver" />
            네이버로 시작하기
          </button>
          <button id="g-login">
            <img src="/images/google.svg" alt="google" />
            Google로 시작하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
