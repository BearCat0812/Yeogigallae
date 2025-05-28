import React from 'react'
import './Regist.css'

const Regist = () => {
  return (
    <div className="regist-container">
      <h2>회원가입</h2>
      <form className="regist-form">
        <div className="form-group">
          <label htmlFor="username">이름</label>
          <input type="text" id="username" placeholder="이름을 입력하세요" />
        </div>
        <div className="form-group">
          <label htmlFor="password">이메일</label>
          <input type="email" id="password" placeholder="이메일을 입력하세요" />
        </div>
        <div className="form-group">
          <label htmlFor="password">아이디</label>
          <input type="text" id="password" placeholder="아이디를 입력하세요" />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" placeholder="비밀번호를 입력하세요" />
        </div>
        <div className="form-group">
          <label htmlFor="password">전화번호</label>
          <input type="tel" id="password" placeholder="전화번호를 입력하세요" />
        </div>
        <button type="submit" className="login-button" >회원가입</button>
      </form>
    </div>
  )
}

export default Regist
