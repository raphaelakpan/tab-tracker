module.exports = {
  port: process.env.PORT || 8000,
  development: {
    database: process.env.DB_NAME || 'tab-tracker',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    options: {
      dialect: process.env.DIALECT || 'postgres',
      host: process.env.HOST || "127.0.0.1",
      port: process.env.PORT || 5432
    }
  }
}
