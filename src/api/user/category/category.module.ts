import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController, UserCategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController, UserCategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
