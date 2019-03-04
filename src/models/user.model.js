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
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        rank: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        image: Sequelize.STRING        
})

/**
 * Check if current user is Admin
 * @param {User} user 
 */
User.isAdmin = (user) => {
    if(user.rank === 5) return true;
    else return false;
}

/**
 * Clean and format user properties
 * @param {User} user 
 */
User.cleaner = (user) => {
    let { username, password, email, name } = user;

    let tmpUser = {};

    if(email) tmpUser['email'] = email.toLowerCase();
    if(name) tmpUser['name'] = name;
    if(password) tmpUser['password'] = password.replace(/ /g, '');
    if(username) tmpUser['username'] = username.replace(/ /g, '').toLowerCase();
    
    return new User(tmpUser);
}

export default User