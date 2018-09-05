'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _job = require('../models/job.model');

var _job2 = _interopRequireDefault(_job);

var _sha = require('sha1');

var _sha2 = _interopRequireDefault(_sha);

var _jsonwebtoken = require('jsonwebtoken');

var jwt = _interopRequireWildcard(_jsonwebtoken);

var _guard = require('../config/guard');

var _guard2 = _interopRequireDefault(_guard);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserRoutes = server => {

    // Novo usuário
    server.post('/user', (req, res) => {
        let user = new _user2.default(req.body);
        user.password = user.password ? (0, _sha2.default)(user.password) : '';

        user.save().then(result => {
            res.send(result);
        }).catch(err => {
            res.send(err.errors.map(current => current.message));
        });
    });

    // Middleware 
    server.use(_guard2.default);

    // Listar usuários
    server.get('/user', (req, res) => {
        _user2.default.findAll().then(result => {
            res.send(result);
        }).catch(err => {
            res.send(err);
        });
    });

    // Listar usuário detalhado
    server.get('/user/:id', (req, res) => {
        const { id } = req.params;

        _user2.default.findOne({ where: { id: id } }).then(result => {
            res.send(result);
        }).catch(error => {
            res.send(error);
        });
    });

    // Deletar usuário
    server.delete('/user/:id', (req, res) => {
        const { id } = req.params;

        _user2.default.findOne({ where: { id: id } }).then(user => {
            user.destroy().then(result => {
                res.send(result);
            }).catch(err => res.send(err));
        }).catch(err => res.send(err));
    });

    // Alterar usuário
    server.put('/user/:id', (req, res) => {
        const { id } = req.params;

        _user2.default.findOne({ where: { id: id } }).then(user => {
            user.update(req.body).then(result => res.send(result)).catch(err => res.send(err));
        }).catch(err => res.send(err));
    });

    // Listar usuário e trabalhos
    server.get('/user/:id/jobs', (req, res) => {
        const { id } = req.params;
        _user2.default.findOne({ where: { id: id }, include: [{ model: _job2.default }] }).then(result => res.send(result)).catch(err => res.send(err));
    });

    // Atrelar trabalho ao usuário
    server.post('/user/:id/job/:jobid', (req, res) => {
        const { id, jobid } = req.params;
        _user2.default.findOne({ where: { id: id } }).then(user => {
            _job2.default.findOne({ where: { id: jobid } }).then(job => {
                user.addJobs(job);
                user.save().then(result => res.send({ message: 'Trabalho adicionado ao usuário' })).catch(err => res.send(err));
            }).catch(err => res.send(err));
        }).catch(err => res.send(err));
    });

    // Remover trabalho do usuário
    server.delete('/user/:id/job/:jobid', (req, res) => {
        const { id, jobid } = req.params;
        _user2.default.findOne({ where: { id: id }, include: [{ model: _job2.default }] }).then(user => {
            let toDelete = user.jobs.map(current => current.id === jobid);
            user.removeJobs(toDelete);
            user.save().then(result => res.send('Job removido')).catch(err => res.send(err));
        }).catch(err => res.send(err));
    });
};

exports.default = UserRoutes;