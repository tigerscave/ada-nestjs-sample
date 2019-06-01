module.exports = {
  "type": "postgres",
  "host": process.env.DB_HOST,
  "port": process.env.DB_PORT,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DATABASE,
  "ssl": process.env.SSL === "TRUE",
  "entities": process.env.NODE_ENV === 'development' ? ["src/**/*.entity{.ts,.js}"] : "dist/**/*.entity.js",
  "synchronize": true
}