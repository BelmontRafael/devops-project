import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { models } from "src/models";

const APP_SCHEMA = "casa-church";

function getDialectOptions() {
  return process.env.PGSSLMODE === "require"
    ? { ssl: { require: true, rejectUnauthorized: false } }
    : undefined;
}

function getConnectionOptions() {
  return {
    dialect: "postgres" as const,
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    dialectOptions: getDialectOptions(),
  };
}

async function ensureDatabaseSchema() {
  const sequelize = new Sequelize({
    ...getConnectionOptions(),
    logging: false,
  });

  try {
    await sequelize.authenticate();
    await sequelize.query(`CREATE SCHEMA IF NOT EXISTS "${APP_SCHEMA}"`);
  } finally {
    await sequelize.close();
  }
}

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: async () => {
        await ensureDatabaseSchema();

        return {
          ...getConnectionOptions(),
          models: models,
          autoLoadModels: true,
          synchronize: true,
          logging: false,
        };
      },
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
