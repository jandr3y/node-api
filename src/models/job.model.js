import Sequelize from 'sequelize'
import db from '../config/database'
import User from './user.model'

const Job = db.sequelize.define('job', {
    id: { 
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    owner: {
        type: Sequelize.UUID
    }
}, {
    timestamps: false
})


export default Job