import { HttpException, HttpStatus, Inject, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../api/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { AuthHelper } from './auth.helper';
import { UserType } from 'src/common/data.constant';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<User | never> {
    const { name, email, password, user_type }: RegisterDto = body;
    let user: User = await this.repository.findOne({ where: { email } });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    user = new User();

    user.name = name;
    user.email = email;
    user.password = this.helper.encodePassword(password);

    if(user_type == "ADMIN"){
      user.user_type = UserType.admin;
    }else{
      user.user_type = UserType.user;
    }

    return this.repository.save(user);
  }

  public async login(body: LoginDto): Promise<any | never> {
    const { email, password }: LoginDto = body;
    const user: User = await this.repository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    this.repository.update(user.id, { lastLoginAt: new Date() });
    return { accessToken: this.helper.generateToken(user) };
  }

  public async refresh(user: User): Promise<any> {
    this.repository.update(user.id, { lastLoginAt: new Date() });
    return { accessToken: this.helper.generateToken(user) };
  }
}