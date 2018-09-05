'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('../routes');

var _routes2 = _interopRequireDefault(_routes);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = (0, _express2.default)();

// body parser
server.use(_bodyParser2.default.urlencoded({ extended: false }));
server.use(_bodyParser2.default.json());

// Inicia rotas da aplicação
(0, _routes2.default)(server);

exports.default = server;