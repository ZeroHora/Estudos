require('dotenv').config()

module.exports.config = {
    DB_CONFIG_Pool_MYSQL: {
        connectionLimit:  process.env.DB_CONNECTIONLIMIT,
        port:             process.env.DB_PORT,
        host:             process.env.DB_SERVER,
        user:             process.env.DB_USER,
        password:         process.env.DB_PW,
        database:         process.env.DB_NAME,
        autocommit: 0
    },
    DB_CONFIG_Pool_Oracle: {
        server:   process.env.DB_SERVER,
        database: process.env.DB_NAME,
        user:     process.env.DB_USER,
        password: process.env.DB_PW
    },
    DB_CONFIG_MYSQL: {
        host:      process.env.DB_SERVER,
        user:      process.env.DB_USER,
        password:  process.env.DB_PW,
        database:  process.env.DB_NAME,
        autocommit: 0

    }
}