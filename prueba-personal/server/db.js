import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "db_prueba",
    port: 5432
})
