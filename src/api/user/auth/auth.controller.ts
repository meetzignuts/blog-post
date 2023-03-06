import { Body, Controller, Inject, Post, ClassSerializerInterceptor, UseInterceptors, UseGuards, Req, Delete, Param, Put, Get } from '@nestjs/common';
import { User } from '../../../api/user/user.entity';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { JwtAuthUserGuard, JwtAuthAdminGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { DUser } from './auth.decorator';

@Controller('auth')
export class AuthController {
  
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('/signup')
  @UseInterceptors(ClassSerializerInterceptor)
  private register(@Body() body: RegisterDto): Promise<User | never> {
    return this.service.register(body);
  }

  @Post('/login')
  private login(@Body() body: LoginDto): Promise<string | never> {
    return this.service.login(body);
  }

  @Post('/admin/refresh')
  @UseGuards(JwtAuthAdminGuard)
  private refreshAdmin(@Req() { user }: Request): Promise<string | never> {
    return this.service.refresh(<User>user);
  }

  @Post('/user/refresh')
  @UseGuards(JwtAuthUserGuard)
  private refreshUser(@Req() { user }: Request): Promise<string | never> {
    return this.service.refresh(<User>user);
  }
}
