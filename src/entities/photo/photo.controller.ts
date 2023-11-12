import { Request } from 'express';
import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  create(@Req() request : Request, @Body() createPhotoDto: CreatePhotoDto) {
    return this.photoService.create(request,createPhotoDto);
  }

  @Get()
  findAll() {
    return this.photoService.findAll();
  }

  @Get(':id')
  getPhoto(@Param('id') id: string) {
    return this.photoService.getPhoto({id});
  }

  @Patch(':id')
  update(@Req() request : Request,@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
    return this.photoService.update(request,id, updatePhotoDto);
  }

  @Post('addToAlbum/:id')
  addToAlbum(@Req() request : Request,@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
    return this.photoService.addToAlbum(request,id, updatePhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoService.remove(id);
  }
}
