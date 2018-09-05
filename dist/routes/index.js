'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('./user.routes');

var _user2 = _interopRequireDefault(_user);

var _jobs = require('./jobs.routes');

var _jobs2 = _interopRequireDefault(_jobs);

var _auth = require('./auth.routes');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = server => {
    (0, _auth2.default)(server);
    (0, _user2.default)(server);
    (0, _jobs2.default)(server);
};

exports.default = routes;