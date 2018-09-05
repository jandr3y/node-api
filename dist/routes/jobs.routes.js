'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _job = require('../models/job.model');

var _job2 = _interopRequireDefault(_job);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const JobRoutes = server => {

    /* Novo Job
    *  Body: attrs e user com id (apenas)
    * */
    server.post('/job', (req, res) => {
        const { title, description, user } = req.body;
        _user2.default.findOne({ where: { id: user.id } }).then(user => {
            let job = new _job2.default({ title, description, owner: user.id });
            job.save().then(result => res.send(result)).catch(err => res.send(err));
        }).catch(err => res.send(err));
    });

    server.get('/job', (req, res) => {
        _job2.default.findAll({ include: [{ model: _user2.default, attributes: ['name', 'id'] }] }).then(result => res.send(result)).catch(err => res.send(err));
    });

    server.get('/job/:id', (req, res) => {
        const { id } = req.params;
        _job2.default.find({
            where: {
                id: id
            },
            include: [{
                model: _user2.default,
                attributes: ['username', 'id', 'name', 'image']
            }]
        }).then(result => res.send(result)).catch(err => res.send(err));
    });
};

exports.default = JobRoutes;