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
  const [ok, setOk] = useState(1);

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
      MOBILE: /^010([0-9]{8})$/,
      EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    },
    ERROR_MESSAGES: {
      ID: {
        INVALID: '6~20자의 영문 소문자와 숫자만 사용 가능합니다',
        SUCCESS: '사용 가능한 아이디입니다',
        FAIL: '이미 존재하는 아이디입니다'
      },
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

  const validateEmail = (email) => {
    return CONFIG.REGEX.EMAIL.test(email);
  };

  function register(e) {
    e.preventDefault();

    // 필수 필드 검사
    if (!name.trim() || !email.trim() || !id.trim() || !pw.trim() || !pwRe.trim() || !tel.trim()) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // 아이디 중복 확인 검사
    if (ok !== 0) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }

    // 이메일 유효성 검사
    if (!validateEmail(email)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }

    // 비밀번호 유효성 검사
    if (!CONFIG.REGEX.PASSWORD.test(pw)) {
      alert("비밀번호 형식이 올바르지 않습니다.");
      return;
    }

    // 비밀번호 확인 검사
    if (pw !== pwRe) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 전화번호 유효성 검사
    if (!CONFIG.REGEX.MOBILE.test(tel)) {
      alert("올바른 전화번호 형식이 아닙니다.");
      return;
    }

    fetch("http://localhost:8080/regist", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, id, pw, tel, stat: "register", ok })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          alert("회원가입이 정상적으로 완료되었습니다.");
          navigate('/login');
        } else {
          alert(res.message || "회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      });
  }

  function idCompare(e) {
    e.preventDefault();
    fetch("http://localhost:8080/regist", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, stat: "idCompare" })
    })
      .then(res => res.json())
      .then(res => {
        if (res.duplicateCheck == 1) {
          setOk(1);
          setErrors(prev => ({ ...prev, id: CONFIG.ERROR_MESSAGES.ID.FAIL }));
        } else {
          if (res.success == true) {
            setOk(0);
            setErrors(prev => ({ ...prev, id: CONFIG.ERROR_MESSAGES.ID.SUCCESS }));
          } else {
            setOk(1);
            setErrors(prev => ({ ...prev, id: CONFIG.ERROR_MESSAGES.ID.INVALID }));
          }
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
              /* 배경 클릭 시 아이디 비교 */
              // onBlur={idCompare}
              onChange={e => setId(e.target.value)}
            />
            {/* 버튼 클릭 시 아이디 비교 */}
            <button className="duplicate-check-btn" type="button" onClick={idCompare}>중복 확인</button>
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
