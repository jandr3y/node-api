const mysql = require('mysql')
import User from '../models/User';

// Connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

const errorHandler = (error, message, reject) => {
  if (error) console.log(error.sqlMessage)
  reject({ error: message })
}

const usersService = require('./user.service')({ connection }, User)

module.exports = {
  user: () => usersService,
}
