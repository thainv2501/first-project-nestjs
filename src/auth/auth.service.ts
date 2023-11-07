import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInUserDto } from './dto/sign-in-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService  ) {} 
    
    async signIn(SignInUserDto: SignInUserDto){
    // const foundUser = await this.userRepository.createQueryBuilder('user').addSelect('*').where('user.email=:email',{email:SignInUserDto.email}).getOne();
    const foundUser = await this.userRepository.findOneBy([{email : SignInUserDto.loginName} , {userName : SignInUserDto.loginName}])
    if(!foundUser){
      throw new BadRequestException(`Something went wrong !`);
    } 
    const matchPassword = await bcrypt.compare(SignInUserDto.password,foundUser.password)
    if(!matchPassword){
      throw new BadRequestException(`Wrong password !`);
    } 
    if(foundUser.status == 'inactive'){
      throw new BadRequestException(`Inactive account`);
    }
    delete foundUser.password

    const access_token = await this.jwtService.signAsync({foundUser})
    return {access_token , signInUser: foundUser};
  }

  
}
