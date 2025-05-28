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
    <div className="regist-container container">
      <form className="regist-form">
        <div className="regist-content">
          <img src="/images/logo.png" alt="여기갈래" />
        </div>

        <p>회원가입</p>
        <h1>가입을 통해 더 다양한 서비스를 만나보세요!</h1>
        <div className="regist-form-group" id="info__name">
            <label htmlFor="username">이름</label>
            <input type="text" id="username" placeholder="이름을 입력하세요" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="regist-form-group id-group">
            <label htmlFor="id">아이디</label>
            <div id="info__id">
                <input type="text" id="id" placeholder="아이디를 입력하세요" onChange={(e) => setId(e.target.value)} />
                <button className="duplicate-check-btn">중복 확인</button>
            </div>
            <div className="error-msg"></div>
        </div>
        <div className="regist-form-group" id="info__pw">
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" placeholder="비밀번호를 입력하세요" onChange={(e) => setPw(e.target.value)} />
            <i className="fa fa-eye fa-lg"></i>
            <div className="error-msg"></div>
        </div>
        <div className="regist-form-group" id="info__pwRe">
            <label for="regist-rpw">패스워드 재입력</label>
            <input id="regist-rpw" type="password" placeholder="" />
            <i className="fa fa-eye fa-lg"></i>
            <div className="error-msg"></div>
        </div>
        <div className="regist-form-group">
            <label htmlFor="email">이메일</label>
            <div className="email-group">
                <input type="email" id="email" placeholder="이메일을 입력하세요" onChange={(e) => setEmail(e.target.value)} />
                <p>@</p>
                <input className="em-box" id="signup-em-box" type="text" />
                <select className="em-box" id="signup-em-list">
                    <option value="type">직접 입력</option>
                    <option value="naver.com">naver.com</option>
                    <option value="google.com">google.com</option>
                    <option value="hanmail.net">hanmail.net</option>
                    <option value="nate.com">nate.com</option>
                    <option value="kakao.com">kakao.com</option>
                </select>
            </div>
        </div>
        <div className="signup-form-group" id="info__mobile">
            <label htmlFor="tel">전화번호</label>
            <input type="tel" id="tel" placeholder="전화번호를 입력하세요" onChange={(e) => setTel(e.target.value)} />
            <div className="error-msg"></div>
        </div>
        <div className="signup-form-group jcc">
            <button type="submit" className="regist-button" onClick={register}>회원가입</button>
        </div>
      </form>
    </div>
  )
}

export default Regist
