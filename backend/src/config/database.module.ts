import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { models } from "src/models";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      models: models,
      autoLoadModels: true,
      synchronize: true,
      logging: false,
      dialectOptions:
        process.env.PGSSLMODE === "require"
          ? { ssl: { require: true, rejectUnauthorized: false } }
          : undefined,
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
