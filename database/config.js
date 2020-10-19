require('dotenv').config();
const development = process.env.DEVELOPMENT

module.exports = {
  development: {
   db : `mongodb:${process.env.MONGO_DB_HOST}/${process.env.DATABASE_NAME}`
  },
};