import React, { useEffect, useState } from 'react';
import './Regist.css';
import { useNavigate } from 'react-router-dom';

const Regist = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [emailDomainInputDisabled, setEmailDomainInputDisabled] = useState(false);
  const [selectedEmailDomainOption, setSelectedEmailDomainOption] = useState('type');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwRe, setPwRe] = useState('');
  const [tel, setTel] = useState('');

  const [pwVisible, setPwVisible] = useState(false);
  const [pwReVisible, setPwReVisible] = useState(false);

  const [errors, setErrors] = useState({
    id: '',
    pw: '',
    pwRe: '',
    tel: ''
  });

  const CONFIG = {
    REGEX: {
      ID: /^[a-zA-Z0-9]{6,20}$/,
      PASSWORD: /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
      MOBILE: /^010([0-9]{8})$/
    },
    ERROR_MESSAGES: {
      ID: {
        INVALID: '6~20자의 영문 소문자와 숫자만 사용 가능합니다',
        SUCCESS: '사용 가능한 아이디입니다'
      },
      PASSWORD: '8~20자의 영문, 숫자, 특수문자를 모두 포함한 비밀번호를 입력해주세요',
      PASSWORD_CONFIRM: {
        SUCCESS: '비밀번호가 일치합니다',
        FAIL: '비밀번호가 일치하지 않습니다'
      },
      MOBILE: {
        INVALID: "'-' 제외 11자리를 입력해주세요",
        SUCCESS: '유효한 휴대폰 번호입니다'
      }
    }
  };

  // emailId, emailDomain 바뀔 때 email 상태 업데이트
  useEffect(() => {
    if (emailId && emailDomain) {
      setEmail(`${emailId}@${emailDomain}`);
    } else {
      setEmail('');
    }
  }, [emailId, emailDomain]);

  const validateId = id => {
    if (CONFIG.REGEX.ID.test(id)) {
      setErrors(prev => ({ ...prev, id: CONFIG.ERROR_MESSAGES.ID.SUCCESS }));
    } else {
      setErrors(prev => ({ ...prev, id: CONFIG.ERROR_MESSAGES.ID.INVALID }));
    }
  };

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

  // 이메일 도메인 select 변경 처리 함수
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

  function register(e) {
    e.preventDefault();
    fetch("http://localhost:8080/regist", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, id, pw, tel })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          alert("Regist Response Success");
          navigate('/login');
        }
      });
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
          <input
            type="text"
            id="username"
            placeholder="이름을 입력하세요"
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="regist-form-group id-group">
          <label htmlFor="id">아이디</label>
          <div id="info__id">
            <input
              type="text"
              id="id"
              placeholder="아이디를 입력하세요"
              onBlur={e => validateId(e.target.value)}
              onChange={e => setId(e.target.value)}
            />
            <button className="duplicate-check-btn" type="button">중복 확인</button>
          </div>
          <div className="error-msg">{errors.id}</div>
        </div>

        <div className="regist-form-group" id="info__pw">
          <label htmlFor="password">비밀번호</label>
          <input
            type={pwVisible ? 'text' : 'password'}
            id="password"
            placeholder="비밀번호를 입력하세요"
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
          <label htmlFor="regist-rpw">패스워드 재입력</label>
          <input
            id="regist-rpw"
            type={pwReVisible ? 'text' : 'password'}
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

        <div className="regist-form-group">
          <label htmlFor="email">이메일</label>
          <div className="email-group">
            <input
              type="text"
              placeholder="이메일 아이디"
              value={emailId}
              onChange={e => setEmailId(e.target.value)}
            />
            <p>@</p>
            <input
              className="em-box"
              id="regist-em-box"
              type="text"
              value={emailDomain}
              disabled={emailDomainInputDisabled}
              onChange={e => setEmailDomain(e.target.value)}
            />
            <select
              className="em-box"
              id="regist-em-list"
              value={selectedEmailDomainOption}
              onChange={handleEmailDomainChange}
            >
              <option value="type">직접 입력</option>
              <option value="naver.com">naver.com</option>
              <option value="google.com">google.com</option>
              <option value="hanmail.net">hanmail.net</option>
              <option value="nate.com">nate.com</option>
              <option value="kakao.com">kakao.com</option>
            </select>
          </div>
        </div>

        <div className="regist-form-group" id="info__mobile">
          <label htmlFor="tel">전화번호</label>
          <input
            type="tel"
            id="tel"
            placeholder="전화번호를 입력하세요"
            onChange={e => {
              setTel(e.target.value);
              validateMobile(e.target.value);
            }}
          />
          <div className="error-msg">{errors.tel}</div>
        </div>

        <div className="regist-form-group jcc">
          <button type="submit" className="regist-button" onClick={register}>회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default Regist;
