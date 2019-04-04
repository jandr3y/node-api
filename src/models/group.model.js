import Sequelize from 'sequelize'
import db from "../config/database";
import User from "./user.model";

const Group = db.sequelize.define('group', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: Sequelize.STRING,
        groupname: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            isAlpha: true
        },
        owner: {
            type: Sequelize.UUID
        },
        plan: {
          type: Sequelize.INTEGER
        },
        boards: {
          type: Sequelize.INTEGER
        },
        createdAt: Sequelize.DATE,
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        membersCount: {
          type: Sequelize.INTEGER
        },
        status: {
          type: Sequelize.INTEGER
        }        
})

// Group.hasOne(User, { foreignKey: { name: 'owner' }});

// relations


export default Group