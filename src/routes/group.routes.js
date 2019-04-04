import Group from '../models/group.model'
import * as jwt from 'jsonwebtoken'
import Guard from '../config/guard'
import Validator from '../utils/validator';
import { Forbbiden } from '../utils/responses';
import Sequelize from "sequelize";
import { SequelizeError } from "../utils/helpers";


const GroupRoutes = (server) => {


  // Middleware 
  server.use(Guard)


  /**
   * POST Create group
   */
  server.post('/group', async (req, res) => {

    try {
      new Validator(req.body.name, 'Nome do Grupo').minLength(6).maxLength(155);
      new Validator(req.body.groupname, 'Link').minLength(6).maxLength(65);
    }catch(validationError){
      return res.status(400).json(validationError);
    }


  });

  /**
   * GET List All Groups.
   */
  server.get('/group', async (req, res) => {
    
      
      // exclude from result


      Group.findAll()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ error: SequelizeError(err) }));
    
  })


  /**
   * GET Single user
   */
  server.get('/user/:id', async (req, res) => {

    const { id } = req.params

    if(User.isAdmin(req.decoded) || req.decoded.id === id){

      let args = {
        where: {
          id: id
        }
      };

      User.findOne(args)
        .then(results => res.status(200).json(results))
        .catch(error => res.status(500).json({ error: SequelizeError(err) }));

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
  server.delete('/user/:id', async (req, res) => {
    const { id } = req.params

    if(req.decoded.id == id){

      let args = {
        where: {
          id: id
        }
      }
      User.findOne(args)
      .then(user => {
        user.destroy()
          .then(result => res.send(result))
          .catch(err => res.send(err))
      })
      .catch(err => res.send(err));

    }else{
      Forbbiden(res);
    }
  })


  /**
   * Update user
   */
  server.put('/user/:id', async (req, res) => {

    const { id } = req.params
    const { rank } = req.decoded;

    let oUser = User.cleaner(req.body);

    // delete constat properties
    delete oUser.id;
    delete oUser.createdAt;

    if(rank === 0){
      delete oUser.rank;
      delete oUser.email;
    }

    oUser.updatedAt = Sequelize.fn('NOW');
    
    if(User.isAdmin(req.decoded) || req.decoded.id == id){ 

      User.findOne({ where: { id: id } })
      .then(user => {
        user.update(oUser.dataValues)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: SequelizeError(err) }));
      })
      .catch(err => res.status(500).json({ error: SequelizeError(err) }));
      
    }else{
      Forbbiden(res);
    }
  })

}

export default GroupRoutes;