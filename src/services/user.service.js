import User from '../models/User';
import {
  pool
} from '../config/database';

class UserService {

  /**
   * Auth Service
   * @param {User} user 
   */
  static auth(user){
    return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
        conn.query(`SELECT username, email, name, id FROM users WHERE username = ? AND password = ? `, [user.username, user.password],
          (err, result) => {

            conn.release();
            if (err) reject(err);
            if(result.length == 1){
              resolve(result);
            }else{
              reject('Senha ou usuário incorretos.')
            }
          });
      });
    });
  }

  static save(user){  
    return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
        conn.query(`INSERT INTO users (username, name, password, rank, email) VALUES (?, ?, ?, ?, ?)`, [user.username, user.name, user.password, user.rank, user.email],
          (err, result) => {
            console.log('eae')
            conn.release();
            if(err) reject(err);
            
            if(result) {
              resolve(result)
            }else{
              reject(result)
            }
          });
      })
    })
  }

  static find(user){
    
    let query = `SELECT username, email, name, id FROM users WHERE username = ? AND password = ? `;

    return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
        conn.query(`SELECT username, email, name, id FROM users WHERE username = ? AND password = ? `, [user.username, user.password],
          (err, result) => {

            conn.release();
            if (err) reject(err);
            if(result.length == 1){
              resolve(result);
            }else{
              reject('Senha ou usuário incorretos.')
            }
          });
      });
    });
  }

}



export default UserService