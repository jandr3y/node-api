'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _database = require('../config/database');

var _database2 = _interopRequireDefault(_database);

var _user = require('./user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Job = _database2.default.sequelize.define('job', {
    id: {
        type: _sequelize2.default.INTEGER,
        primaryKey: true
    },
    title: {
        type: _sequelize2.default.STRING,
        allowNull: false
    },
    description: {
        type: _sequelize2.default.TEXT,
        allowNull: false
    },
    owner: {
        type: _sequelize2.default.UUID
    }
}, {
    timestamps: false
});

exports.default = Job;