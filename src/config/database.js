require('dotenv').config()
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
});

const db = connection;

export default db