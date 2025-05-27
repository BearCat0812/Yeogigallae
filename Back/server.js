const mariadb = require('mariadb');
const express = require('express');
const app = express();
const cors = require('cors');

const pool = mariadb.createPool({
    host: "192.168.0.191",
    user: "1team",
    password: "1team",
    database: "1team",
    port: "3306"
})

async function registData(id, pw) {
    let conn = await pool.getConnection();
    const rows = await conn.query('SELECT id, pw FROM users WHERE id = ?', [id]);

    if (rows.length == 0 || rows[0].id !== id) {
        conn.query("INSERT INTO users(id,pw) VALUES (?,?)", [id, pw]);
        console.log("회원가입 성공")
    } else {
        console.log("이미 존재하는 아이디 입니다.");
    }
}

async function login(id, pw) {
    let conn = await pool.getConnection();
    const rows = await conn.query('SELECT id, pw FROM users WHERE id = ?', [id]);
    if (rows.length > 0) {
        if(pw === rows[0].pw){
            console.log("로그인 성공");
        } else {
            console.log("비밀번호가 다릅니다")
        }
    } else {
        console.log("아이디를 확인해주세요");
    }
}

app.use(express.json());
app.use(cors());

app.post('/regist', async (req, res) => {
    const { id, pw } = req.body;
    registData(id, pw);
    res.json({ success: true });
})

app.post('/login', async (req, res) => {
    const { id, pw } = req.body;
    login(id, pw);
    res.json({ success: true });
})

app.listen(8080, () => {
    console.log('서버 실행 중');
});
