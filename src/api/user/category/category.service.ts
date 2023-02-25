import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  @InjectRepository(Category)
  private readonly repository: Repository<Category>;

  public async create(createCategoryDto: CreateCategoryDto) {
    return this.repository.save(createCategoryDto);
  }

  public async findAll() {
    return this.repository.find();
  }

  public async findOne(id: number) {
    return this.repository.findOne({where: { id }});
  }

  public async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.repository.update(id, updateCategoryDto);
  }

  public async remove(id: number) {
    return await this.repository.delete(id);
  }
}
