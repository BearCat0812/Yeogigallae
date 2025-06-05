import React, { useEffect, useState } from 'react';
import './Mypage.css';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [emailDomainInputDisabled, setEmailDomainInputDisabled] = useState(false);
  const [selectedEmailDomainOption, setSelectedEmailDomainOption] = useState('type');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pwRe, setPwRe] = useState('');
  const [tel, setTel] = useState('');

  const [pwVisible, setPwVisible] = useState(false);
  const [pwReVisible, setPwReVisible] = useState(false);

  const [errors, setErrors] = useState({
    pw: '',
    pwRe: '',
    tel: ''
  });

  const CONFIG = {
    REGEX: {
      PASSWORD: /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
      MOBILE: /^010([0-9]{8})$/,
      EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    },
    ERROR_MESSAGES: {
      PASSWORD: '8~20자의 영문, 숫자, 특수문자를 모두 포함한 비밀번호를 입력해주세요',
      PASSWORD_CONFIRM: {
        SUCCESS: '비밀번호가 일치합니다',
        FAIL: '비밀번호가 일치하지 않습니다'
      },
      MOBILE: {
        INVALID: "'-' 제외 11자리를 입력해주세요",
        SUCCESS: '유효한 휴대폰 번호입니다'
      },
      EMAIL: {
        INVALID: "올바른 이메일 형식이 아닙니다",
        SUCCESS: "유효한 이메일입니다"
      }
    }
  };

  useEffect(() => {
    // 사용자 정보 불러오기
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
          setName(data.name);
          const [emailPrefix, emailSuffix] = data.email.split('@');
          setEmailId(emailPrefix);
          setEmailDomain(emailSuffix);
          setEmail(data.email);
          setTel(data.tel);
        }
      });
  }, []);

  // emailId, emailDomain 바뀔 때 email 상태 업데이트
  useEffect(() => {
    if (emailId && emailDomain) {
      setEmail(`${emailId}@${emailDomain}`);
    } else {
      setEmail('');
    }
  }, [emailId, emailDomain]);

  const validatePassword = pw => {
    if (CONFIG.REGEX.PASSWORD.test(pw)) {
      setErrors(prev => ({ ...prev, pw: '유효한 비밀번호입니다' }));
    } else {
      setErrors(prev => ({ ...prev, pw: CONFIG.ERROR_MESSAGES.PASSWORD }));
    }
  };

  const validatePasswordConfirm = (pw, pwRe) => {
    if (!pw || !pwRe) return;
    if (pw !== pwRe) {
      setErrors(prev => ({ ...prev, pwRe: CONFIG.ERROR_MESSAGES.PASSWORD_CONFIRM.FAIL }));
    } else {
      setErrors(prev => ({ ...prev, pwRe: CONFIG.ERROR_MESSAGES.PASSWORD_CONFIRM.SUCCESS }));
    }
  };

  const validateMobile = tel => {
    if (CONFIG.REGEX.MOBILE.test(tel)) {
      setErrors(prev => ({ ...prev, tel: CONFIG.ERROR_MESSAGES.MOBILE.SUCCESS }));
    } else {
      setErrors(prev => ({ ...prev, tel: CONFIG.ERROR_MESSAGES.MOBILE.INVALID }));
    }
  };

  const handleEmailDomainChange = e => {
    const val = e.target.value;
    setSelectedEmailDomainOption(val);
    if (val === 'type') {
      setEmailDomain('');
      setEmailDomainInputDisabled(false);
    } else {
      setEmailDomain(val);
      setEmailDomainInputDisabled(true);
    }
  };

  const validateEmail = (email) => {
    return CONFIG.REGEX.EMAIL.test(email);
  };

  function updateUserInfo(e) {
    e.preventDefault();

    // 필수 필드 검사
    if (!name.trim() || !email.trim() || !tel.trim()) {
      alert("이름, 이메일, 전화번호는 필수 입력 항목입니다.");
      return;
    }

    // 이메일 유효성 검사
    if (!validateEmail(email)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }

    // 전화번호 유효성 검사
    if (!CONFIG.REGEX.MOBILE.test(tel)) {
      alert("올바른 전화번호 형식이 아닙니다.");
      return;
    }

    // 비밀번호가 입력된 경우에만 검사
    if (pw) {
      if (!CONFIG.REGEX.PASSWORD.test(pw)) {
        alert("비밀번호 형식이 올바르지 않습니다.");
        return;
      }
      if (pw !== pwRe) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
    }

    const userId = localStorage.getItem('userId');
    
    fetch("http://localhost:8080/update-user", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ 
        id: userId,
        name, 
        email, 
        pw: pw || undefined,
        tel 
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Server response was not ok');
        }
        return res.json();
      })
      .then(res => {
        if (res.success) {
          alert("회원정보가 성공적으로 수정되었습니다.");
          navigate('/');
        } else {
          alert(res.message || "회원정보 수정에 실패했습니다. 다시 시도해주세요.");
        }
      })
      .catch(error => {
        console.error('Error updating user info:', error);
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      });
  }

  return (
    <div className="regist-container container">
      <form className="regist-form" onSubmit={updateUserInfo}>
        <div className="regist-content">
          <img src="/images/logo.png" alt="여기갈래" />
        </div>

        <p>회원정보 수정</p>
        <h1>회원님의 정보를 수정하실 수 있습니다.</h1>

        <div className="regist-form-group" id="info__name">
          <label htmlFor="username">이름</label>
          <input
            type="text"
            id="username"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="regist-form-group">
          <label htmlFor="email">이메일</label>
          <div className="email-input-group">
            <input
              type="text"
              id="emailId"
              value={emailId}
              onChange={e => setEmailId(e.target.value)}
            />
            <span>@</span>
            <input
              type="text"
              id="emailDomain"
              value={emailDomain}
              disabled={emailDomainInputDisabled}
              onChange={e => setEmailDomain(e.target.value)}
            />
            <select value={selectedEmailDomainOption} onChange={handleEmailDomainChange}>
              <option value="type">직접 입력</option>
              <option value="naver.com">naver.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="hanmail.net">hanmail.net</option>
              <option value="nate.com">nate.com</option>
              <option value="kakao.com">kakao.com</option>
            </select>
          </div>
        </div>

        <div className="regist-form-group" id="info__pw">
          <label htmlFor="password">새 비밀번호</label>
          <input
            type={pwVisible ? 'text' : 'password'}
            id="password"
            placeholder="변경할 비밀번호를 입력하세요"
            onChange={e => {
              setPw(e.target.value);
              validatePassword(e.target.value);
              validatePasswordConfirm(e.target.value, pwRe);
            }}
          />
          <i
            className={`fa ${pwVisible ? 'fa-eye-slash' : 'fa-eye'} fa-lg`}
            onClick={() => setPwVisible(!pwVisible)}
            style={{ cursor: 'pointer' }}
          ></i>
          <div className="error-msg">{errors.pw}</div>
        </div>

        <div className="regist-form-group" id="info__pwRe">
          <label htmlFor="password-confirm">새 비밀번호 확인</label>
          <input
            type={pwReVisible ? 'text' : 'password'}
            id="password-confirm"
            placeholder="비밀번호를 다시 입력하세요"
            onChange={e => {
              setPwRe(e.target.value);
              validatePasswordConfirm(pw, e.target.value);
            }}
          />
          <i
            className={`fa ${pwReVisible ? 'fa-eye-slash' : 'fa-eye'} fa-lg`}
            onClick={() => setPwReVisible(!pwReVisible)}
            style={{ cursor: 'pointer' }}
          ></i>
          <div className="error-msg">{errors.pwRe}</div>
        </div>

        <div className="regist-form-group" id="info__tel">
          <label htmlFor="tel">전화번호</label>
          <input
            type="text"
            id="tel"
            value={tel}
            placeholder="'-' 제외 11자리를 입력해주세요"
            onChange={e => {
              setTel(e.target.value);
              validateMobile(e.target.value);
            }}
          />
          <div className="error-msg">{errors.tel}</div>
        </div>

        <button type="submit" className="submit-btn">
          정보 수정
        </button>
      </form>
    </div>
  );
};

export default MyPage;
