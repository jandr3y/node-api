'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _sha = require('sha1');

var _sha2 = _interopRequireDefault(_sha);

var _jsonwebtoken = require('jsonwebtoken');

var jwt = _interopRequireWildcard(_jsonwebtoken);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AuthRoutes = server => {
    server.post('/auth', (req, res) => {
        const { username, password } = req.body;
        let encrypt = (0, _sha2.default)(password);
        _user2.default.findOne({ attributes: ['id', 'name', 'username', 'email', 'rank'],
            where: { username: username, password: encrypt } }).then(user => {
            console.log('ae');
            if (user !== null) {
                let token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);
                res.send({ user, token });
            } else {
                res.send('Não autenticado');
            }
        }).catch(err => {
            res.send(err);
        });
    });
};

exports.default = AuthRoutes;