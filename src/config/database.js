import Sequelize from 'sequelize'

const sequelize = new Sequelize('teama', 'remote', 'remote', {
    host: '192.168.0.10',
    dialect: 'mysql'
})

const db = { sequelize }

export default db