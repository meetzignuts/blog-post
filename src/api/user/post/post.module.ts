import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController, UserPostController } from './post.controller';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category])],
  controllers: [PostController, UserPostController],
  providers: [PostService]
})
export class PostModule {}
