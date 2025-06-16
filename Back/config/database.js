const mariadb = require('mariadb');

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

module.exports = {
    pool,
    executeQuery
}; 