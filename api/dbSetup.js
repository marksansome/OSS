const { Pool, Client } = require('pg')

const pool = new Pool({
    user: "pgadmin",
    password: "docker",
    database: "oss",
    host: "localhost",
    port: "5432",
})

pool.on('error', function (err) {
    winston.error('idle client error', err.message, err.stack)
})

module.exports = pool;