import { AlbumModule } from './entities/album/album.module';
import { PhotoModule } from './entities/photo/photo.module';
import { UsersModule } from './entities/users/users.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './db/data.config';
import { AuthModule } from './auth/auth.module';
import { configData } from './config';
import { APP_FILTER } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthMiddleware } from './utility/middleware/auth.middleware';
import { AllExceptionsFilter } from './exception/all.exception';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configData],
    }),
    // TypeOrmModule.forRootAsync(
    //   {imports : [ConfigModule],
    //   useFactory : (configService : ConfigService) => configService.get<TypeOrmModuleAsyncOptions>("database"),
    // inject : [ConfigService]}
    // ),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    UsersModule,
    PhotoModule,
    AlbumModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'users/getResetPasswordToken', method: RequestMethod.GET },
        { path: 'users/resetPassword', method: RequestMethod.PATCH },
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/verify', method: RequestMethod.POST },
        { path: 'auth', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
