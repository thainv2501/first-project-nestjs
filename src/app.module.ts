import { AlbumModule } from './entities/album/album.module';
import { PhotoModule } from './entities/photo/photo.module';
import { UsersModule } from './entities/users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './db/data.config';
import { AuthModule } from './auth/auth.module';
import { configData } from './config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';



@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    ignoreEnvFile: true,
    load : [configData]
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
  AlbumModule,
  AuthModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
