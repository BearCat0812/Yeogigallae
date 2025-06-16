// 전화번호 유효성 검사 함수
const validatePhoneNumber = (tel) => {
    const phoneRegex = /^010([0-9]{8})$/;
    return phoneRegex.test(tel);
};

// 이메일 유효성 검사 함수
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
};

// 비밀번호 유효성 검사 함수
const validatePassword = (pw) => {
    const hasLength = pw.length >= 8 && pw.length <= 20;
    const hasLetter = /[A-Za-z]/.test(pw);
    const hasNumber = /[0-9]/.test(pw);
    const hasSpecial = /[!@#$%^&*]/.test(pw);
    const hasValidChars = /^[A-Za-z0-9!@#$%^&*]+$/.test(pw);

    return hasLength && hasLetter && hasNumber && hasSpecial && hasValidChars;
};

// 아이디 유효성 검사 함수
const validateId = (id) => {
    const idRegex = /^[a-zA-Z0-9]{6,20}$/;
    return idRegex.test(id);
};

module.exports = {
    validatePhoneNumber,
    validateEmail,
    validatePassword,
    validateId
}; 