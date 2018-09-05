'use strict';

var _server = require('./config/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_server2.default.listen(3000, '192.168.0.10', () => console.log('Servidor Rodando'));