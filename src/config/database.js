require('dotenv').config()
const mysql = require('mysql')

export let pool = mysql.createPool({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
});

