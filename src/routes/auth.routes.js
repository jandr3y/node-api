
import sha1 from 'sha1'
import * as jwt from 'jsonwebtoken'
import Validator from '../utils/validator';

import User from '../models/User';
import UserService from '../services/user.service'

const AuthRoutes = (server) => {

  /**
   * Create a new user
   */
  server.post('/auth', (req, res) => { 
    const {
      username,
      password
    } = req.body;

    try {
      new Validator(username, 'Username').required();
      new Validator(password, 'Password').required();
    }catch(e){
      return res.json(e);
    }

    let encrypt = sha1(password);

    let user = new User();
    user.username = username;
    user.password = encrypt;
    
    let attrs = {
      attributes: ['id', 'name', 'username', 'email', 'rank'],
      where: {
        username: username,
        password: encrypt
      }
    }

    UserService.auth(user)
      .then(userResult => {

        if(typeof userResult[0].id === 'undefined'){
          return res.status(401).json({ message: 'Senha ou usuário incorretos.', status: false });
        }else{
          let token = jwt.sign(JSON.stringify(userResult), process.env.JWT_SECRET);
          return res.json({ user: userResult[0], token }).status(200);
        }
      })
      .catch(error => {
        return res.status(401).json({ message: error, status: false });
      });
  })
}

export default AuthRoutes