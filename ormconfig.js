function TypeOrmConfig() {
  const { MONGO_CONNECTION_STRING } = process.env;

  //const migrationsDir = '/db/migrations';

  return {
    entities: [__dirname + "/**/*.entity.ts"],
    ssl: true,
    synchronize: true,
    type: "mongodb",
    url: MONGO_CONNECTION_STRING,
    useUnifiedTopology: true,
    //useNewUrlParser: true,
    //migrations: [migrationsDir + '/*.js'],
    //cli: { migrationsDir },
  };
}

module.exports = TypeOrmConfig();
