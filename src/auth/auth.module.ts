import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configData } from 'src/config';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports : [TypeOrmModule.forFeature([User]),
  ConfigModule.forRoot({
    load: [configData],
  }),
  JwtModule.registerAsync({
    imports : [ConfigModule],
    useFactory : (configService : ConfigService) => (
      {global: true,
      secret:  configService.get('access_token'),
      signOptions: { expiresIn: '7d' }}),
    inject : [ConfigService]
  }),],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
