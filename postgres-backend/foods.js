import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    user: 'my_user',
    host: 'localhost',
    database: 'foodsmanagement',
    password: 'root',
    port: 5432,
});

export default pool;
