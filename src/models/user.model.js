import Sequelize from 'sequelize'
import db from "../config/database";

const User = db.sequelize.define('j_user', {
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

User.isAdmin = (user) => {
    if(user.rank === 5) return true;
    else return false;
}

export default User