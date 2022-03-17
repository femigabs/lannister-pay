import 'dotenv/config';

export default {
  DATABASE_URL: process.env.LANNISTER_DATABASE_URL || process.env.DATABASE_URL
};
