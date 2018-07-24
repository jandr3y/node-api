import Sequelize from 'sequelize'
import db from "../config/database";
import Job from './job.model'

const User = db.sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: Sequelize.STRING,
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            isAlpha: true
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        rank: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        image: Sequelize.STRING        
})

Job.belongsTo(User, { foreignKey: { name: 'owner' } })

Job.belongsToMany(User, { through: 'User_job', foreignKey: { name: 'job_id' }, timestamps: false })
User.belongsToMany(Job, { through: 'User_job', foreignKey: { name: 'user_id' }, timestamps: false })

export default User