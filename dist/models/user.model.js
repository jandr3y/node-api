'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _database = require('../config/database');

var _database2 = _interopRequireDefault(_database);

var _job = require('./job.model');

var _job2 = _interopRequireDefault(_job);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const User = _database2.default.sequelize.define('user', {
    id: {
        type: _sequelize2.default.INTEGER,
        primaryKey: true
    },
    name: _sequelize2.default.STRING,
    username: {
        type: _sequelize2.default.STRING,
        allowNull: false,
        unique: true,
        isAlpha: true
    },
    email: {
        type: _sequelize2.default.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: _sequelize2.default.STRING,
        allowNull: false
    },
    createdAt: _sequelize2.default.DATE,
    updatedAt: _sequelize2.default.DATE,
    rank: {
        type: _sequelize2.default.INTEGER,
        allowNull: false
    },
    image: _sequelize2.default.STRING
});

_job2.default.belongsTo(User, { foreignKey: { name: 'owner' } });

_job2.default.belongsToMany(User, { through: 'User_job', foreignKey: { name: 'job_id' }, timestamps: false });
User.belongsToMany(_job2.default, { through: 'User_job', foreignKey: { name: 'user_id' }, timestamps: false });

exports.default = User;