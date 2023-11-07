import { config } from 'dotenv';
config()
export const configData = () => ({
    database :  {
        type: 'postgres',
        host: 'localhost',
        port: Number(process.env.DATABASE_PORT),
        username: process.env.USERNAME,
        password:  process.env.PASSWORD,
        database:  process.env.DATABASE_NAME,
        entities: [],
        synchronize: true,
    },
    access_token : process.env.ACCESS_TOKEN_SECRET,
})