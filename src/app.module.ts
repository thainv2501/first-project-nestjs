import { AlbumModule } from './entities/album/album.module';
import { PhotoModule } from './entities/photo/photo.module';
import { UsersModule } from './entities/users/users.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './db/data.config';
import { AuthModule } from './auth/auth.module';
import { configData } from './config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './utility/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthMiddleware } from './utility/middleware/auth.middleware';



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
  providers: [AppService,JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude(
      { path: 'users/getResetPasswordToken', method: RequestMethod.GET },
      { path: 'users/resetPassword', method: RequestMethod.PATCH },
      { path: 'users', method: RequestMethod.POST },
    )
    .forRoutes("*");
  }
}