import { PartialType } from '@nestjs/mapped-types';
import { Trim } from 'class-sanitizer';
import { IsInt, IsString } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @Trim()
  @IsString()
  public readonly title: string;

  @Trim()
  @IsString()
  public readonly content: string;

  @IsInt()
  public readonly categoryId: number;
}
