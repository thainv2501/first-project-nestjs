import { config } from 'dotenv';
import { IConfig } from './IConfig';
config()
export const configData = () : IConfig  => ({
    database :  {
        type: 'postgres',
        host: 'localhost',
        port: Number(process.env.DATABASE_PORT),
        username: process.env.USER_NAME,
        password:  process.env.PASSWORD,
        database:  process.env.DATABASE_NAME,
        entities: [],
        synchronize: true,

    },
    access_token : process.env.ACCESS_TOKEN_SECRET,
})

console.log(configData())