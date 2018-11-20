const dbConfig = {
    user: "pgadmin",
    password: "docker",
    database: "oss",
    host: "localhost",
    port: "5432"
}

const pool = new pg.Pool(dbConfig)
pool.on('error', function (err) {
    winston.error('idle client error', err.message, err.stack)
})

const client = await pool.connect()

module.exports = client;