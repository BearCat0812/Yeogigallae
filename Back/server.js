const mariadb = require('mariadb');
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const expressSession = require('express-session');
const app = express();
const pool = mariadb.createPool({
    host: "192.168.0.191",
    user: "1team",
    password: "1team",
    database: "1team",
    port: "3306"
});

// DB 쿼리 실행 헬퍼 함수
const executeQuery = async (query, params = []) => {
    const conn = await pool.getConnection();
    try {
        return await conn.query(query, params);
    } finally {
        conn.release();
    }
};

// 필터링된 데이터 조회
async function print(region, dateType, places) {
    if (!region && !dateType && (!places || places.length === 0)) {
        return await executeQuery('SELECT id,region,placeName,address,dateType,place,imgName FROM `database`');
    }

    const conditions = [];
    const params = [];

    if (region) {
        conditions.push('region = ?');
        params.push(region);
    }
    if (dateType) {
        conditions.push('dateType = ?');
        params.push(dateType);
    }
    if (places?.length) {
        const placeCondition = places.length === 1
            ? 'place = ?'
            : '(place = ? OR place = ?)';
        conditions.push(placeCondition);
        params.push(...places);
    }

    const query = `
        SELECT id,region,placeName,address,dateType,place,imgName 
        FROM \`database\` 
        ${conditions.length ? 'WHERE ' + conditions.join(' AND ') : ''}
    `;

    return await executeQuery(query, params);
}

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
    // 각 조건을 개별적으로 검사
    const hasLength = pw.length >= 8 && pw.length <= 20;
    const hasLetter = /[A-Za-z]/.test(pw);
    const hasNumber = /[0-9]/.test(pw);
    const hasSpecial = /[!@#$%^&*]/.test(pw);
    const hasValidChars = /^[A-Za-z0-9!@#$%^&*]+$/.test(pw);

    // 모든 조건을 만족하는지 확인
    return hasLength && hasLetter && hasNumber && hasSpecial && hasValidChars;
};

// 아이디 유효성 검사 함수
const validateId = (id) => {
    const idRegex = /^[a-zA-Z0-9]{6,20}$/;
    return idRegex.test(id);
};

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

// 회원가입 처리
async function registData(name, email, id, pw, tel) {
    try {
        // 필수 필드 검사
        if (!name || !email || !id || !pw || !tel) {
            return { success: false, message: "모든 필드를 입력해주세요." };
        }

        // 이메일 유효성 검사
        if (!validateEmail(email)) {
            return { success: false, message: "올바른 이메일 형식이 아닙니다." };
        }

        // 아이디 유효성 검사
        if (!validateId(id)) {
            return { success: false, message: "아이디는 6~20자의 영문 소문자와 숫자만 사용 가능합니다." };
        }

        // 비밀번호 유효성 검사
        if (!validatePassword(pw)) {
            return { success: false, message: "비밀번호는 8~20자의 영문, 숫자, 특수문자를 모두 포함해야 합니다." };
        }

        // 전화번호 유효성 검사
        if (!validatePhoneNumber(tel)) {
            return { success: false, message: "올바른 전화번호 형식이 아닙니다." };
        }

        // 아이디 중복 검사
        const existingUser = await executeQuery('SELECT id FROM users WHERE id = ?', [id]);
        if (existingUser.length > 0) {
            return { success: false, message: "이미 존재하는 아이디입니다." };
        }

        // 이메일 중복 검사
        const existingEmail = await executeQuery('SELECT email FROM users WHERE email = ?', [email]);
        if (existingEmail.length > 0) {
            return { success: false, message: "이미 사용 중인 이메일입니다." };
        }

        // 비밀번호 해싱
        const hashedPassword = await hashPassword(pw);

        // 회원가입 처리
        await executeQuery(
            "INSERT INTO users(name,email,id,pw,tel) VALUES (?,?,?,?,?)",
            [name, email, id, hashedPassword, tel]
        );
        return { success: true };
    } catch (error) {
        console.error('회원가입 오류:', error);
        return { success: false, message: "서버 오류가 발생했습니다." };
    }
}

// 로그인 처리
async function login(id, pw) {
    const users = await executeQuery('SELECT id, pw FROM users WHERE id = ?', [id]);
    if (!users.length) return false;

    return await bcrypt.compare(pw, users[0].pw);
}

// 검색 처리
async function searchData(keyword) {
    const searchPattern = `%${keyword}%`;
    return await executeQuery(
        `SELECT id,region,placeName,address,dateType,place,imgName 
         FROM \`database\` 
         WHERE placeName LIKE ? OR address LIKE ? OR place LIKE ?`,
        [searchPattern, searchPattern, searchPattern]
    );
}

// 한국어 날짜 문자열을 Date 객체로 변환하는 함수
function parseKoreanDate(dateStr) {
    try {
        // "2025. 6. 5. 오후 12:23:30" 형식의 문자열을 파싱
        const matches = dateStr.match(/(\d+)\.\s*(\d+)\.\s*(\d+)\.\s*(오전|오후)\s*(\d+):(\d+):(\d+)/);
        if (!matches) return new Date();

        let [_, year, month, day, ampm, hours, minutes, seconds] = matches;

        // 시간을 24시간 형식으로 변환
        hours = parseInt(hours);
        if (ampm === '오후' && hours < 12) hours += 12;
        if (ampm === '오전' && hours === 12) hours = 0;

        return new Date(
            parseInt(year),
            parseInt(month) - 1, // 월은 0-based
            parseInt(day),
            hours,
            parseInt(minutes),
            parseInt(seconds)
        );
    } catch (error) {
        console.error('Date parsing error:', error);
        return new Date();
    }
}

// 리뷰 조회 함수
async function getReviews(placeId) {
    try {
        const reviews = await executeQuery(
            `SELECT c.title, c.detail, c.date, c.name as userName 
             FROM comment c 
             WHERE c.database_id = ? 
             ORDER BY c.date DESC`,
            [placeId]
        );

        // 날짜 형식 변환
        const formattedReviews = reviews.map(review => {
            const date = review.date ? parseKoreanDate(review.date) : new Date();
            return {
                ...review,
                date: date.toISOString()
            };
        });
        return formattedReviews;
    } catch (error) {
        console.error('Error in getReviews:', error);
        return [];
    }
}

// comment 함수 수정
async function comment(userNum, DBId, name, title, detail, now) {
    try {
        if (userNum && name) {
            const result = await executeQuery(
                `INSERT INTO comment(users_num, database_id, name, title, detail, date)
                VALUES (?, ?, ?, ?, ?, ?)`,
                [userNum, DBId, name, title, detail, now]
            );
            return result.affectedRows > 0;
        }
        return false;
    } catch (error) {
        console.error('Error in comment function:', error);
        return false;
    }
}

// 미들웨어 설정
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.use(expressSession({
    secret: 'KEY',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 20, // 20분
    }
}));

// 라우트 설정
app.post('/regist', async (req, res) => {
    const { stat, id, name, email, pw, tel, ok } = req.body;

    if (stat === "idCompare") {
        const exists = await executeQuery('SELECT id FROM users WHERE id = ?', [id]);
        return res.json({
            success: !exists.length && id.length > 6,
            duplicateCheck: exists.length ? 1 : 0
        });
    }

    if (stat === "register" && ok === 0) {
        try {
            // 필수 필드 검사
            if (!name || !email || !id || !pw || !tel) {
                return res.json({ success: false, message: "모든 필드를 입력해주세요." });
            }

            // 아이디 중복 검사
            const existingUser = await executeQuery('SELECT id FROM users WHERE id = ?', [id]);
            if (existingUser.length > 0) {
                return res.json({ success: false, message: "이미 존재하는 아이디입니다." });
            }

            // 이메일 중복 검사
            const existingEmail = await executeQuery('SELECT email FROM users WHERE email = ?', [email]);
            if (existingEmail.length > 0) {
                return res.json({ success: false, message: "이미 사용 중인 이메일입니다." });
            }

            // 비밀번호 해싱
            const hashedPassword = await hashPassword(pw);

            // 회원가입 처리
            await executeQuery(
                "INSERT INTO users(name,email,id,pw,tel) VALUES (?,?,?,?,?)",
                [name, email, id, hashedPassword, tel]
            );

            return res.json({ success: true });
        } catch (error) {
            console.error('회원가입 오류:', error);
            return res.json({ success: false, message: "서버 오류가 발생했습니다." });
        }
    }

    res.json({ success: false });
});

app.post('/login', async (req, res) => {
    const { id, pw } = req.body;
    const isValid = await login(id, pw);

    if (!isValid) {
        return res.status(401).json({ success: false });
    }

    const user = await executeQuery('SELECT name,num FROM users WHERE id = ?', [id]);

    req.session.userNum = user[0].num;
    req.session.userId = id;
    req.session.userName = user[0].name;

    res.status(200).json({ success: true, id, name: req.session.userName });
});

app.post('/about', async (req, res) => {
    const { title, detail, now, placeId } = req.body;
    try {

        // 댓글 저장
        const setDB = await comment(req.session.userNum, placeId, req.session.userName, title, detail, now);

        if (setDB) {
            // 저장 성공 시 최신 리뷰 목록 반환
            const reviews = await getReviews(placeId);
            return res.json({
                success: true,
                reviews: reviews
            });
        }

        res.json({
            success: false,
            message: "댓글 저장에 실패했습니다."
        });
    } catch (error) {
        console.error('Error in /about:', error);
        res.json({
            success: false,
            message: "서버 오류가 발생했습니다."
        });
    }
});

app.post('/', async (req, res) => {
    const result = await print(req.body.region, req.body.dateType, req.body.places);
    res.json(result);
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ success: false });
        }
        res.clearCookie('connect.sid'); // 기본 세션 쿠키 이름
        res.json({ success: true });
    });
});

app.post('/select', (req, res) => {
    return res.json({ name: req.session.userName })
})

app.post('/user-info', async (req, res) => {
    const { id } = req.body;
    try {
        const user = await executeQuery('SELECT id, name, email, tel FROM users WHERE id = ?', [id]);
        if (user.length > 0) {
            res.json({
                success: true,
                id: user[0].id,
                name: user[0].name,
                email: user[0].email,
                tel: user[0].tel
            });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

/* 찜 DB 저장 */
app.post('/dibs', async (req, res) => {
    const { placeId } = req.body;
    if (req.session.userId) {
        await executeQuery('INSERT INTO dibs(users_num,database_id) VALUES (?,?)', [req.session.userNum, placeId]);
    }
})

/* 찜 DB 삭제 */
app.post('/dibs-delete', async (req, res) => {
    const { placeId } = req.body;
    if (req.session.userId) {
        await executeQuery('DELETE FROM dibs WHERE users_num = ? AND database_id = ?', [req.session.userNum, placeId]);
    }
})


app.get('/all', async (req, res) => {
    try {
        const data = await executeQuery('SELECT id,region,placeName,address,dateType,place,imgName FROM `database`');
        res.json(data);
    } catch (error) {
        console.error('데이터 조회 오류:', error);
        res.status(500).json({ error: '데이터를 불러오는 중 오류가 발생했습니다.' });
    }
});

app.get('/search', async (req, res) => {
    const result = req.query.keyword ? await searchData(req.query.keyword) : [];
    res.json(result);
});

app.get('/session-check', (req, res) => {
    if (req.session.userId) {
        res.json({ loggedIn: true, id: req.session.userId, name: req.session.userName });
    } else {
        res.json({ loggedIn: false });
    }
});

app.post('/update-user', async (req, res) => {
    const { id, name, email, pw, tel } = req.body;

    try {
        // 필수 필드 검사
        if (!id || !name || !email || !tel) {
            return res.json({ success: false, message: "필수 정보가 누락되었습니다." });
        }

        // 이메일 유효성 검사
        if (!validateEmail(email)) {
            return res.json({ success: false, message: "올바른 이메일 형식이 아닙니다." });
        }

        // 전화번호 유효성 검사
        if (!validatePhoneNumber(tel)) {
            return res.json({ success: false, message: "올바른 전화번호 형식이 아닙니다." });
        }

        // 이메일 중복 검사 (현재 사용자 제외)
        const existingEmail = await executeQuery('SELECT email FROM users WHERE email = ? AND id != ?', [email, id]);
        if (existingEmail.length > 0) {
            return res.json({ success: false, message: "이미 사용 중인 이메일입니다." });
        }

        // 비밀번호가 제공된 경우에만 유효성 검사
        if (pw) {
            if (!validatePassword(pw)) {
                return res.json({ success: false, message: "비밀번호는 8~20자의 영문, 숫자, 특수문자를 모두 포함해야 합니다." });
            }
            // 비밀번호 해싱
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

        res.json({ success: true });
    } catch (error) {
        console.error('Error updating user:', error);
        res.json({ success: false, message: "서버 오류가 발생했습니다." });
    }
});

// placeEx 데이터 조회
async function getPlaceDetails(placeId) {
    return await executeQuery('SELECT placeEx FROM `database` WHERE id = ?', [placeId]);
}

// 장소 상세 정보만 조회하는 엔드포인트
app.get('/place-details/:id', async (req, res) => {
    try {
        const placeId = req.params.id;
        const placeEx = await getPlaceDetails(placeId);

        if (placeEx.length > 0) {
            res.json({
                success: true,
                placeEx: placeEx[0].placeEx
            });
        } else {
            res.json({
                success: false,
                message: "장소를 찾을 수 없습니다."
            });
        }
    } catch (error) {
        console.error('Error in /place-details:', error);
        res.json({
            success: false,
            message: "서버 오류가 발생했습니다."
        });
    }
});

// 리뷰 조회 API
app.get('/reviews/:placeId', async (req, res) => {
    try {
        const placeId = req.params.placeId;
        const reviews = await getReviews(placeId);

        res.json({
            success: true,
            reviews: reviews
        });
    } catch (error) {
        console.error('Error in /reviews:', error);
        res.json({
            success: false,
            message: "서버 오류가 발생했습니다."
        });
    }
});

app.listen(8080, () => console.log('서버 실행 중...'));
