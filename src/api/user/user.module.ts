import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, CategoryModule, PostModule]
})
export class UserModule {}