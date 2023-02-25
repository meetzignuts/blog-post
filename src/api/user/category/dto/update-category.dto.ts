import { PartialType } from '@nestjs/mapped-types';
import { Trim } from "class-sanitizer";
import { IsEmail, IsString } from "class-validator";
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @Trim()
  @IsString()
  public readonly name: string;
}
