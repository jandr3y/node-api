import User from '../models/user.model'
import Jobs from '../models/job.model'
import sha1 from 'sha1'
import * as jwt from 'jsonwebtoken'
import Guard from '../config/guard'

const UserRoutes = (server) => {

    // Novo usuário
    server.post('/user', (req, res) => {
        let user = new User(req.body)
        user.password = sha1(user.password)
        user.save()
            .then(result => {
                res.send(result)
            })
            .catch(err => {
                res.send(err.errors.map(current => current.message))
            })
    })

    // Middleware 
    server.use(Guard)

    // Listar usuários
    server.get('/user', (req, res) => {
        User.findAll()
            .then(result => {
                res.send(result)
            })
            .catch(err => {
                res.send('Houve um erro')
            })
    })

    // Listar usuário detalhado
    server.get('/user/:id', (req, res) => {
        const { id } = req.params
        
        User.findOne({ where : { id : id }})
            .then(result => {
                res.send(result)
            })
            .catch(error => {
                res.send(error)
            })
    })

    // Deletar usuário
    server.delete('/user/:id', (req, res) => {
        const { id } = req.params
        
        User.findOne({ where : { id : id }})
            .then(user => {
                user.destroy()
                    .then(result => {
                        res.send(result)
                    })
                    .catch(err => res.send(err))
            })
            .catch(err => res.send(err))
    })


    // Alterar usuário
    server.put('/user/:id', (req, res) => {
        const { id } = req.params

        User.findOne({ where : { id : id }})
            .then(user => {
                user.update(req.body)
                    .then(result => res.send(result))
                    .catch(err => res.send(err))
            })
            .catch(err => res.send(err))
    })

    // Listar usuário e trabalhos
    server.get('/user/:id/jobs', (req, res) => {
        const { id } = req.params
        User.findOne({ where: { id : id }, include: [{ model: Jobs }]})
            .then(result => res.send(result))
            .catch(err => res.send(err))
    })

    // Atrelar trabalho ao usuário
    server.post('/user/:id/job/:jobid', (req, res) => {
        const { id, jobid } = req.params
        User.findOne({ where: { id : id }})
            .then(user => {
                Jobs.findOne({ where: { id : jobid }})
                    .then(job => {
                        user.addJobs(job)
                        user.save()
                            .then(result => res.send({ message: 'Trabalho adicionado ao usuário' }))
                            .catch(err => res.send(err))
                    })
                    .catch(err => res.send(err))
            })
            .catch(err => res.send(err))
    })

    // Remover trabalho do usuário
    server.delete('/user/:id/job/:jobid', (req, res) => {
        const { id, jobid } = req.params
        User.findOne({ where : { id : id }, include: [{ model: Jobs }]})
            .then(user => {
                let toDelete = user.jobs.map(current => current.id === jobid)
                user.removeJobs(toDelete)
                user.save()
                    .then(result => res.send('Job removido'))
                    .catch(err => res.send(err))
            })
            .catch(err => res.send(err))
    })
}

export default UserRoutes