const { executeQuery } = require('../config/database');
const bcrypt = require('bcrypt');

// 비밀번호 해싱 함수
const hashPassword = async (pw) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(pw, salt);
    } catch (error) {
        console.error('비밀번호 해싱 오류:', error);
        throw error;
    }
};

// 아이디 중복 체크
const checkIdExists = async (id) => {
    const users = await executeQuery('SELECT id FROM users WHERE id = ?', [id]);
    return users.length > 0;
};

// 로그인 처리
const login = async (id, pw) => {
    const users = await executeQuery('SELECT id, pw, num, name FROM users WHERE id = ?', [id]);
    if (!users.length) return false;
    const isValid = await bcrypt.compare(pw, users[0].pw);
    if (isValid) {
        return {
            success: true,
            userNum: users[0].num,
            userName: users[0].name
        };
    }
    return false;
};

// 회원가입 처리
const register = async (name, email, id, pw, tel) => {
    try {
        const hashedPassword = await hashPassword(pw);
        await executeQuery(
            "INSERT INTO users(name,email,id,pw,tel) VALUES (?,?,?,?,?)",
            [name, email, id, hashedPassword, tel]
        );
        return { success: true };
    } catch (error) {
        console.error('회원가입 오류:', error);
        return { success: false, message: "서버 오류가 발생했습니다." };
    }
};

// 사용자 정보 조회
const getUserInfo = async (id) => {
    return await executeQuery('SELECT id, name, email, tel FROM users WHERE id = ?', [id]);
};

// 사용자 정보 업데이트
const updateUser = async (id, name, email, pw, tel) => {
    try {
        if (pw) {
            const hashedPw = await hashPassword(pw);
            await executeQuery(
                'UPDATE users SET name = ?, email = ?, pw = ?, tel = ? WHERE id = ?',
                [name, email, hashedPw, tel, id]
            );
        } else {
            await executeQuery(
                'UPDATE users SET name = ?, email = ?, tel = ? WHERE id = ?',
                [name, email, tel, id]
            );
        }
        return { success: true };
    } catch (error) {
        console.error('사용자 정보 업데이트 오류:', error);
        return { success: false, message: "서버 오류가 발생했습니다." };
    }
};

// 회원탈퇴
const deleteUser = async (userNum) => {
    try {
        await executeQuery('START TRANSACTION');
        
        await executeQuery('DELETE FROM dibs WHERE users_num = ?', [userNum]);
        await executeQuery('DELETE FROM comment WHERE users_num = ?', [userNum]);
        await executeQuery('DELETE FROM users WHERE num = ?', [userNum]);
        
        await executeQuery('COMMIT');
        return { success: true };
    } catch (error) {
        await executeQuery('ROLLBACK');
        console.error('회원탈퇴 실패:', error);
        return { success: false, message: "서버 오류가 발생했습니다." };
    }
};

module.exports = {
    login,
    register,
    getUserInfo,
    updateUser,
    deleteUser,
    checkIdExists
}; 