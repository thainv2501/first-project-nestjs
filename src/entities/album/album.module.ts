import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';


@Module({
  imports : [TypeOrmModule.forFeature([Album,User]), UsersModule],
  controllers: [AlbumController],
  providers: [AlbumService , UsersService],
})
export class AlbumModule {}
