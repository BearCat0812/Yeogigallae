import React, { useEffect, useState } from 'react';
import './MyPage.css';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    id: '',
    name: '',
    email: '',
    tel: ''
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    fetch("http://localhost:8080/user-info", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: userId })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUserInfo({
            id: data.id,
            name: data.name,
            email: data.email,
            tel: data.tel
          });
        }
      });
  }, [navigate]);

  return (
    <div className="userinfo-container container">
      <div className="userinfo-form">
        <div className="userinfo-content">
          <img src="/images/logo.png" alt="여기갈래" />
        </div>

        <p>마이페이지</p>
        <h1>회원님의 정보입니다.</h1>

        <div className="userinfo-form-group">
          <label>아이디</label>
          <div className="info-value">{userInfo.id}</div>
        </div>

        <div className="userinfo-form-group">
          <label>이름</label>
          <div className="info-value">{userInfo.name}</div>
        </div>

        <div className="userinfo-form-group">
          <label>이메일</label>
          <div className="info-value">{userInfo.email}</div>
        </div>

        <div className="userinfo-form-group">
          <label>전화번호</label>
          <div className="info-value">{userInfo.tel}</div>
        </div>

        <button className="edit-btn" onClick={() => navigate('/mypage/edit')}>
          회원정보 수정
        </button>
      </div>
    </div>
  );
};

export default MyPage;
