import React from 'react'
import './Regist.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Regist = () => {
    const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [id, setId] = useState();
  const [pw, setPw] = useState();
  const [tel, setTel] = useState();

  function register(e) {
    e.preventDefault();
    fetch("http://localhost:8080/regist", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, email: email, id: id, pw: pw, tel: tel })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          alert("Regist Response Success");
          navigate('/login');
        }
      })
  }

  return (
    <div className="regist-container">
      <h2>회원가입</h2>
      <form className="regist-form">
        <div className="form-group">
          <label htmlFor="username">이름</label>
          <input type="text" id="username" placeholder="이름을 입력하세요" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" placeholder="이메일을 입력하세요" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="id">아이디</label>
          <input type="text" id="id" placeholder="아이디를 입력하세요" onChange={(e) => setId(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" placeholder="비밀번호를 입력하세요" onChange={(e) => setPw(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="tel">전화번호</label>
          <input type="tel" id="tel" placeholder="전화번호를 입력하세요" onChange={(e) => setTel(e.target.value)} />
        </div>
        <button type="submit" className="login-button" onClick={register}>회원가입</button>
      </form>
    </div>
  )
}

export default Regist
