import Job from '../models/job.model'
import User from '../models/user.model'

const JobRoutes = (server) => {
    
    /* Novo Job
    *  Body: attrs e user com id (apenas)
    * */
    server.post('/job', (req, res) => {
        const { title, description, user } = req.body
        User.findOne({ where : { id : user.id }})
            .then(user => {
                let job = new Job({ title, description, owner: user.id })
                job.save()
                    .then(result => res.send(result))
                    .catch(err => res.send(err))
            })
            .catch(err => res.send(err))
    })

    server.get('/job', (req, res) => {
        Job.findAll({ include: [ { model: User, attributes : ['name', 'id'] }]})
            .then(result => res.send(result))
            .catch(err => res.send(err))
    })

    server.get('/job/:id', (req, res) => {
        const { id } = req.params
        Job.find({ 
                    where: { 
                        id : id 
                    }, 
                    include: [
                        { 
                            model: User,
                            attributes: ['username', 'id', 'name', 'image']
                        }
                    ]
                })
            .then(result => res.send(result))
            .catch(err => res.send(err))
    })
}

export default JobRoutes