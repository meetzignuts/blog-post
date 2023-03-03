import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserFollowing } from './user-followings.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User, UserFollowing]), AuthModule, CategoryModule, PostModule],
  exports: [UserService]
})
export class UserModule {}