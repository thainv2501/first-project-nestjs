export const config = () => ({
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
})