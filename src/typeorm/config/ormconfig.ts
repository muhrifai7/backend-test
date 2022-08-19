import { ConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const config: any = {
  // production: {
  type: "postgres",
  url: process.env.DATABASE_URL,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities:
    process.env.NODE_ENV == "development"
      ? ["src/typeorm/entities/**/*.ts"]
      : ["dist/typeorm/entities/**/*.js"],
  migrations:
    process.env.NODE_ENV == "development"
      ? ["src/typeorm/migrations/**/*.ts"]
      : ["dist/typeorm/migrations/**/*.js"],
  subscribers:
    process.env.NODE_ENV == "development"
      ? ["src/typeorm/subscriber/**/*.ts"]
      : ["dist/typeorm/subscriber/**/*.js"],
  cli: {
    entitiesDir:
      process.env.NODE_ENV == "development"
        ? "src/typeorm/entities/**/*.ts"
        : "dist/typeorm/entities",
    migrationsDir:
      process.env.NODE_ENV == "development"
        ? "src/typeorm/migrations"
        : "dist/typeorm/migrations",
    subscribersDir:
      process.env.NODE_ENV == "development"
        ? "src/typeorm/subscriber"
        : "dist/typeorm/subscriber",
  },
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  namingStrategy: new SnakeNamingStrategy(),
  // },
  // development: {
  // type: "postgres",
  // host: process.env.PG_HOST,
  // port: Number(process.env.PG_PORT),
  // username: process.env.POSTGRES_USER,
  // password: process.env.POSTGRES_PASSWORD,
  // database: process.env.POSTGRES_DB,
  // synchronize: false,
  // logging: false,
  // entities: ["src/typeorm/entities/**/*.ts"],
  // migrations: ["src/typeorm/migrations/**/*.ts"],
  // subscribers: ["src/typeorm/subscriber/**/*.ts"],
  // cli: {
  //   entitiesDir: "src/typeorm/entities",
  //   migrationsDir: "src/typeorm/migrations",
  //   subscribersDir: "src/typeorm/subscriber",
  // },
  // namingStrategy: new SnakeNamingStrategy(),
  // },
};

export = config;
