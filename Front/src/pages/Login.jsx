import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();

  const [id, setId] = useState();
  const [pw, setPw] = useState();

  function login(e) {
    e.preventDefault();
    fetch("http://localhost:8080/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id, pw: pw })
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
      })

  }

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="username">아이디</label>
          <input type="text" id="username" placeholder="아이디를 입력하세요" onChange={(e) => setId(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" placeholder="비밀번호를 입력하세요" onChange={(e) => setPw(e.target.value)} />
        </div>
        <button type="submit" className="login-button" onClick={login}>로그인</button>
        <button type="button" className="regist-button" onClick={() => navigate('/regist')}>회원가입</button>
      </form>
    </div>
  );
};

export default Login;
