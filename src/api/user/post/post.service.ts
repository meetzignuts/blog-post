import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { WhereClause } from 'typeorm/query-builder/WhereClause';
import { Category } from '../category/entities/category.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  @InjectRepository(Post)
  private readonly repository: Repository<Post>;

  @InjectRepository(Category)
  private readonly catgoryRepository: Repository<Category>;
  
  public async create(createPostDto: CreatePostDto) {
    let { categoryId, ...data} = createPostDto;
    let categoryData = await this.catgoryRepository.findOne({where: { id: categoryId }});
    return this.repository.save({
      ...data,
      "category": categoryData
    });
  }

  public async findAll(searchPostDto: SearchPostDto = undefined) {
    let where:any;
    let searchType: string= "AND";
    if(searchType == "AND"){
      where = {};
    }else{
      where = [];
    }
    if(searchPostDto && searchPostDto.title){
      if(searchType === "OR"){
        where.push({"title": Like('%'+searchPostDto.title+'%')})
      }else{
        Object.assign(where,{"title": Like('%'+searchPostDto.title+'%')});
      }
      
    }
    if(searchPostDto && searchPostDto.content){
      if(searchType === "OR"){
        where.push({ "content": Like('%'+searchPostDto.content+'%')})
      }else{
        Object.assign(where,{ "content": Like('%'+searchPostDto.content+'%')});
      }
      
    }
    if(searchPostDto && searchPostDto.categoryIds.length > 0 ){
      if(searchType === "OR"){
        where.push({ category: {
          id: In(searchPostDto.categoryIds)
        } });
      }else{
        Object.assign(where, { category: {
          id: In(searchPostDto.categoryIds)
        } })
      }
      
    }
    return this.repository.find({
      where,
      relations: {
        category: true
      },
      order: {
        createdAt: 'DESC'
      }
    });
  }

  public async findOne(id: number) {
    return this.repository.findOne({where: { id },relations: {
      category: true
    }});
  }

  public async update(id: number, updatePostDto: UpdatePostDto) {
    let { categoryId, ...data} = updatePostDto;
    let updateData:any = { ...data };
    if(categoryId){
      let categoryData = await this.catgoryRepository.findOne({where: { id: categoryId }});
      updateData.category = categoryData;
    }
    return await this.repository.update(id, updateData);
  }

  public async remove(id: number) {
    return await this.repository.delete(id);
  }
}
