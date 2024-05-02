export default {
  schema: "./database/schema.js",
  out: "./database/out",
  driver: "mysql2",
  dbCredentials: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    // ssl: true,
  },
};