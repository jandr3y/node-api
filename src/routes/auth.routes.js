import User from '../models/user.model'
import sha1 from 'sha1'
import * as jwt from 'jsonwebtoken'

const AuthRoutes = (server) => {
    server.post('/auth', (req, res) => {
        const { username, password } = req.body
        let encrypt = sha1(password)
        User.findOne({ attributes: ['id', 'name', 'username', 'email', 'rank'],
                       where: { username: username, password: encrypt }})
            .then(user => {
                console.log('ae')
                if(user !== null){
                    let token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET)
                    res.send({ user, token })
                }else{
                    res.send('Não autenticado')
                }
            })
            .catch(err => {
                res.send(err)
            })
    })
}

export default AuthRoutes