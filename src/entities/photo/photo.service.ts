import { AlbumService } from './../album/album.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository, DataSource, FindOptionsWhere } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Album } from '../album/entities/album.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository : Repository<Photo>,

    @InjectRepository(Album)
    private albumRepository : Repository<Album>,

    private albumService : AlbumService,

    private dataSource : DataSource ){

  }

  ownerOfPhoto(photo : Photo , id : string){
    return  photo.user.id === id;
  }

  async create(request ,createPhotoDto: CreatePhotoDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const photo = await this.photoRepository.create(createPhotoDto)
      // if(!photo.user){
        photo.user = request.user
      // }
      await this.photoRepository.save(photo)
      return {photo};
      
    } catch (error) {
       // Rollback the transaction on error
       await queryRunner.rollbackTransaction();
       return { err: error.message || "Unknown error occurred" };
    } finally{
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all photo`;
  }

  async getPhoto(
    fields: FindOptionsWhere<Photo> | FindOptionsWhere<Photo>[],
    relationOptions?: string[],
  ): Promise<Photo> {
    return await this.photoRepository.findOne({
      where: fields,
      relations: relationOptions,
    });
  }

  async update(request ,id: string, updatePhotoDto: UpdatePhotoDto) {
    const currentUser : User = request.user;
    const photo = await this.getPhoto({id},['user'])
    if(!photo){
      throw Error("Not found photo")
    }
    if(!this.ownerOfPhoto(photo , currentUser.id)){
        throw new BadRequestException("Not Allow to update photo")
      }
      await this.photoRepository.update({id}, {name : updatePhotoDto.name , status : updatePhotoDto.status});
      return { message: "update successful" , photo };
  }

  async addToAlbum(request ,id: string, updatePhotoDto: UpdatePhotoDto) {
    if (!updatePhotoDto.albumId) {
      throw new BadRequestException("Album Id is required");
    }
    const currentUser : User = request.user;
    const photo = await this.getPhoto({id},['user'])
    if(!photo){
      throw Error("Not found photo")
    }
    if(!this.ownerOfPhoto(photo , currentUser.id)){
        throw new BadRequestException("Not have access on this photo")
      }
    const album =  await this.albumService.getAlbum({id : updatePhotoDto.albumId},['photos']);

    if(!album){
      throw  new Error("Album not found") 
    }
    if(!album.photos){
      album.photos = []
    }
    album.photos.push(photo);
    await this.albumRepository.save(album)
      return { message: "add to album successful" , photo };
  }

  async remove(id: string) {
    await this.photoRepository.delete(id)
    return `This action removes a #${id} photo`;
  }
}
