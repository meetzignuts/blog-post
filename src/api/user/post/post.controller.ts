import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { JwtAuthUserGuard } from '../auth/auth.guard';

@Controller('user/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtAuthUserGuard)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @UseGuards(JwtAuthUserGuard)
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthUserGuard)
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthUserGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthUserGuard)
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}

@Controller('post')
export class UserPostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  findAll(@Body() SearchPostDto: SearchPostDto) {
    return this.postService.findAll(SearchPostDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }
}
