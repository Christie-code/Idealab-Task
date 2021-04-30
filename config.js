const env = process.env;

const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: env.DB_HOST || 'freedb.tech',
    user: env.DB_USER || 'freedbtech_Christiana',
    password: env.DB_PASSWORD || 'k6y!xj4@UDysK2k',
    database: env.DB_NAME || 'freedbtech_idealab',
  },
  listPerPage: env.LIST_PER_PAGE || 100,
};


module.exports = config;