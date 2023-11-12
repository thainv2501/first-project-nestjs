import { SearchAlbumDto } from './dto/search-album.dto';
import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { User } from '../users/entities/user.entity';
import { PageMetaDto } from 'src/utility/common/page-meta.dto';
import { PageDto } from 'src/utility/common/page.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    private usersService : UsersService,
    private dataSource: DataSource,
  ) {}

  async create(req, createAlbumDto: CreateAlbumDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {
      const user = await this.usersService.getUser({ email: req.user.email });
  
      if (!user) {
        throw new Error("User not found");
      }

      
      // Create and save the album
      const album = this.albumRepository.create(createAlbumDto);
      
      // Push the album to the user's albums and save the user
      if (!album.users) {
        album.users = [];
      }
      album.users.push(user);  
      album.createdBy = user.id;
      await this.albumRepository.save(album);
      // Commit the transaction
      await queryRunner.commitTransaction();
      return { message: "Create successful" , album };
    } catch (err) {
      // Rollback the transaction on error
      await queryRunner.rollbackTransaction();
      return { err: err.message || "Unknown error occurred" };
    } finally {
      // Release the queryRunner
      await queryRunner.release();
    }
  }
  

  async getAlbums( searchAlbumDto: SearchAlbumDto) {
    const queryBuilder = this.albumRepository.createQueryBuilder('album');
    if (searchAlbumDto.name) {
      queryBuilder.andWhere('album.name LIKE :name', { name: `%${searchAlbumDto.name}%` });
    }
  
    if (searchAlbumDto.description) {
      queryBuilder.andWhere('album.description LIKE :description', { description: `%${searchAlbumDto.description}%` });
    }
  
    if (searchAlbumDto.status) {
      queryBuilder.andWhere('album.status = :status', { status: searchAlbumDto.status });
    }
    if (searchAlbumDto.user) {
      queryBuilder
        .leftJoin('album.users', 'user') // Assuming 'users' is the name of the relation in the Album entity
        .andWhere('user.email = :userEmail', { userEmail: searchAlbumDto.user });
    }
    queryBuilder
      .orderBy("album.created_at", searchAlbumDto.order)
      .skip((searchAlbumDto.page - 1) * searchAlbumDto.take)
      .take(searchAlbumDto.take);
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto : searchAlbumDto });

    return new PageDto(entities, pageMetaDto);
  }

  async getAlbum(
    fields: FindOptionsWhere<Album> | FindOptionsWhere<Album>[],
    relationOptions?: string[],
  ): Promise<Album> {
    return await this.albumRepository.findOne({
      where: fields,
      relations: relationOptions,
    });
  }

  albumHasUser(album : Album , id : string){
    return album.users.some(user => user.id === id);
  }

  ownerOfAlbum(album : Album , id : string){
    return  album.createdBy === id;
  }

  async update(request ,id: string, updateAlbumDto: UpdateAlbumDto) {
    const currentUser : User = request.user;
    const album = await this.albumRepository.findOne({where : {id} , relations : ['users']})
    if(!album){
      throw Error("Not found album")
    }
    if(!this.ownerOfAlbum(album , currentUser.id)){
        throw new BadRequestException("Not Allow to update album")
      }
      await this.albumRepository.update({id}, {name : updateAlbumDto.name , description : updateAlbumDto.description , status : updateAlbumDto.status});
      return { message: "update successful" , album };
  }

  async insertUser(request ,id: string, updateAlbumDto: UpdateAlbumDto) {
    const currentUser : User = request.user;
    const album = await this.getAlbum({id},['users'])
    if(!album){
      throw Error("Not found album")
    }
    if(!this.albumHasUser(album , currentUser.id)){
      throw new BadRequestException("Not Allow to insert user to album")
    }
    if (!updateAlbumDto.user) {
      throw new BadRequestException("User email is required");
    }
    const newUser = await this.usersService.getUser({email : updateAlbumDto.user})
    if(this.albumHasUser(album,newUser.id)){
      throw new BadRequestException("User has been in this album")
    }
      album.users.push(newUser);  
      await this.albumRepository.save(album)
      return { message: "insert user to album successful" , album };
  }

  async joinAlbum(request ,id: string, updateAlbumDto: UpdateAlbumDto) {
    const currentUser : User = request.user;
    const album = await this.getAlbum({id} ,['users'])
    if(!album){
      throw Error("Not found album")
    }
    if (!updateAlbumDto.user) {
      throw new BadRequestException("User email is required");
    }
    const newUser = await this.usersService.getUser({email : updateAlbumDto.user})
    if(this.albumHasUser(album,newUser.id)){
      throw new BadRequestException("User has been in this album")
    }
      album.users.push(newUser);  
      await this.albumRepository.save(album)
      return { message: "user join to album successful" , album };
  }



   async remove(id: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Create and save the album
      await this.albumRepository.delete({id});
            // Commit the transaction
      await queryRunner.commitTransaction();
      return { message: "Delete successful" };
    } catch (err) {
      // Rollback the transaction on error
      await queryRunner.rollbackTransaction();
      return { err: err.message || "Unknown error occurred" };
    } finally {
      // Release the queryRunner
      await queryRunner.release();
    }  
  }
}
