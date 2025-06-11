import React, { useEffect, useState } from 'react';
import './MyPage.css';
import { useNavigate } from 'react-router-dom';

const MyPage = ({ setIsLoggedIn }) => {
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

  const handleDeleteAccount = () => {
    if (window.confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      fetch("http://localhost:8080/delete-user", {
        method: 'POST',
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            alert('회원 탈퇴가 완료되었습니다.');
            localStorage.removeItem('userId');
            setIsLoggedIn(false);
            navigate('/');
          } else {
            alert(data.message || '회원 탈퇴 처리 중 오류가 발생했습니다.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('서버 오류가 발생했습니다.');
        });
    }
  };

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
        <button className="delete-btn" onClick={handleDeleteAccount}>
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyPage;
