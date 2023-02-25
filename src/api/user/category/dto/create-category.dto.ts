import { Trim } from "class-sanitizer";
import { IsEmail, IsString } from "class-validator";

export class CreateCategoryDto {
  @Trim()
  @IsString()
  public readonly name: string;
}
