import { AlbumModule } from './entities/album/album.module';
import { PhotoModule } from './entities/photo/photo.module';
import { UsersModule } from './entities/users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config';
import { DatabaseConfig } from './db/data.config';



@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    load : [config]
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: "postgres",
    password:  "vietthai2001",
    database:  "album_manager",
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
}),
  UsersModule,
  PhotoModule,
  AlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
