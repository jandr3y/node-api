import User from '../models/user.model'
import sha1 from 'sha1'
import * as jwt from 'jsonwebtoken'
import Guard from '../config/guard'
import Validator from '../utils/validator';
import { Forbbiden } from '../utils/responses';

const UserRoutes = (server) => {

  /**
   * Add a new User
   */
  server.post('/user', (req, res) => {

    let user = new User(req.body);


    // Validate data.
    try {
      new Validator(req.body.email, 'Email').isEmail();
      new Validator(req.body.password, 'Senha').minLength(6).maxLength(20);
      new Validator(req.body.username, 'Usuário').minLength(6).maxLength(20);
      new Validator(req.body.name, 'Nome').minLength(6).maxLength(110);
    }catch(validationError){
      // console.log(validationError);
      return res.status(400).json(validationError);
    }

    user.password = sha1(user.password);
    user.rank = 0;

    user.save()
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        // TODO: Handle this error.
        res.send(err.errors.map(current => current.message))
      })
  })

  // Middleware 
  server.use(Guard)

  /**
   * GET List all users.
   */
  server.get('/user', (req, res) => {
    
    if(User.isAdmin(req.decoded)){
      User.findAll()
        .then(result => {
          res.send(result)
        })
        .catch(err => {
          res.send(err)
        })
    }else{
      Forbbiden(res);
    }
    
  })


  /**
   * GET Single user
   */
  server.get('/user/:id', (req, res) => {
    const {
      id
    } = req.params

    if(User.isAdmin(req.decoded) || req.decoded.id === id){
      User.findOne({
        where: {
          id: id
        }
      })
      .then(result => {
        res.send(result)
      })
      .catch(error => {
        res.send(error)
      })
    }else{
      Forbbiden(res);
    }

  })

  /**
   * t
   *eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NSwibmFtZSI6IktlbWVyIEphbmRyZXkiLCJ1c2VybmFtZSI6IlRoYW15cmVzS2VtZXIiLCJlbWFpbCI6InRrZW1lckBqYW5kcmV5Lm1lIiwicmFuayI6MH0.AqmxjiIxjOf5W4hyKGrSRaE0_nZ2RYg24WV2erkQaT4 
   * 
   * l eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NCwibmFtZSI6Ikx1Y2FzIEphbmRyZXkiLCJ1c2VybmFtZSI6ImFkbWluICAiLCJlbWFpbCI6ImFkbWluQGphbmRyZXkubWUiLCJyYW5rIjo1fQ.9-JgVQWpoOqzpMB3JpTf11hyNxiPsa5Q_pDxKKtDHkU
   * Delete user
   */
  server.delete('/user/:id', (req, res) => {
    const {
      id
    } = req.params

    User.findOne({
        where: {
          id: id
        }
      })
      .then(user => {
        user.destroy()
          .then(result => {
            res.send(result)
          })
          .catch(err => res.send(err))
      })
      .catch(err => res.send(err))
  })


  /**
   * Update user
   */
  server.put('/user/:id', (req, res) => {

    const { id } = req.params
    const { rank } = req.decoded;

    let oUser = User.cleaner(req.body);
    console.log(oUser)
    if(rank === 0){
      delete oUser.createdAt;
      delete oUser.updatedAt;
      delete oUser.email;
    }

    if(User.isAdmin(req.decoded) || req.decoded.id == id){ 
      User.findOne({
        where: {
          id: id
        }
      })
      .then(user => {
        user.update(oUser.dataValues)
        .then(result => res.send(result))
        .catch(err => res.send(err))
      })
      .catch(err => res.send(err))
    }else{
      Forbbiden(res);
    }
  })

}

export default UserRoutes