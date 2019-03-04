import User from '../models/user.model'
import sha1 from 'sha1'
import * as jwt from 'jsonwebtoken'
import Validator from '../utils/validator';


const AuthRoutes = (server) => {
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

    let encrypt = sha1(password)
    
    let attrs = {
      attributes: ['id', 'name', 'username', 'email', 'rank'],
      where: {
        username: username,
        password: encrypt
      }
    }

    User.findOne(attrs)
      .then(user => {
        if (user !== null) {
          let token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET)
          res.send({
            user,
            token
          })
        } else {
          res.send('Não autenticado')
        }
      })
      .catch(err => {
        res.send(err)
      })
  })
}

export default AuthRoutes