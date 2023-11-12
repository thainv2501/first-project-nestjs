import { Request } from 'express';
import { Controller, Get, Post, Body, Patch, Param, Delete,Req ,Query } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { SearchAlbumDto } from './dto/search-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Req() req : Request,@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(req,createAlbumDto);
  }

  @Get()
  getAlbums(@Query() searchAlbumDto : SearchAlbumDto) {
    return this.albumService.getAlbums(searchAlbumDto);
  }

  @Get(':id')
  getAlbum(@Param('id') id: string) {
    return this.albumService.getAlbum({id},['users']);
  }

  @Patch(':id')
  update(@Req() request : Request,@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(request ,id, updateAlbumDto);
  }

  @Patch('insertUser/:id')
  insertUser(@Req() request : Request,@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.insertUser(request ,id, updateAlbumDto);
  }

  @Patch('joinAlbum/:id')
  joinAlbum(@Req() request : Request,@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.joinAlbum(request ,id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumService.remove(id);
  }
}
