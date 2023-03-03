import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController, UserPostController } from './post.controller';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { User } from '../user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category, User])],
  controllers: [PostController, UserPostController],
  providers: [PostService]
})
export class PostModule {}
