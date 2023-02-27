import { Trim } from "class-sanitizer";
import { IsArray, IsInt, IsOptional, IsString } from "class-validator";

export class SearchPostDto {
  @Trim()
  @IsString()
  @IsOptional()
  public readonly title: string;

  @Trim()
  @IsString()
  @IsOptional()
  public readonly content: string;

  @IsArray()
  @IsOptional()
  public readonly categoryIds: number[];
}