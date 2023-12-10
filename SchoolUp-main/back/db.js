const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME, // Название БД
    process.env.DB_USER, // Пользователь
    process.env.DB_PASSWORD, // ПАРОЛЬ
    {
        dialect:  process.env.DB_DIALECT,//postgres or mysql
        host: process.env.DB_HOST,//хост базы данных, куда собсна обращаться
        port: process.env.DB_PORT//порт базы данных, куда стучаться там где обращаться
    }
)