import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Album } from '../album/entities/album.entity';
import { AlbumService } from '../album/album.service';
import { AlbumModule } from '../album/album.module';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';


@Module({
  imports : [TypeOrmModule.forFeature([Photo ,Album , User]), AlbumModule , UsersModule],
  controllers: [PhotoController],
  providers: [PhotoService,AlbumService , UsersService],
})
export class PhotoModule {}
