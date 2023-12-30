import { DataSourceOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { CartItemEntity } from '../db/entities/cart-item.entity';
import { CartEntity } from '../db/entities/cart.entity';

ConfigModule.forRoot();
import 'dotenv/config';

const { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } =
  process.env;

const host = DB_HOST;
const port = Number(DB_PORT);
const username = DB_USER;
const password = DB_PASSWORD;
const database = DB_NAME;

console.log(NODE_ENV);
console.log(host);
console.log(port);
console.log(username);
console.log(password);
console.log(database);

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: [CartEntity, CartItemEntity],
  synchronize: false,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
};
