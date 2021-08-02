function TypeOrmConfig() {
  const { MONGO_CONNECTION_STRING } = process.env;

  //const migrationsDir = '/db/migrations';

  return {
    type: 'mongodb',
    url: MONGO_CONNECTION_STRING,
    entities: [__dirname + '/**/*.entity.ts'],
    ssl: true,
    useUnifiedTopology: true,
    keepConnectionAlive: true,
    //useNewUrlParser: true,
    //migrations: [migrationsDir + '/*.js'],
    //cli: { migrationsDir },
    synchronize: true,
  };
}

module.exports = TypeOrmConfig();
