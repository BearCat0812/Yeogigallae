const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "root",
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