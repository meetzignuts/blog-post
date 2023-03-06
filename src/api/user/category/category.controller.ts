import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthAdminGuard } from '../auth/auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('admin/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthAdminGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @UseGuards(JwtAuthAdminGuard)
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthAdminGuard)
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthAdminGuard)
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthAdminGuard)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}

@Controller('category')
export class UserCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
}
