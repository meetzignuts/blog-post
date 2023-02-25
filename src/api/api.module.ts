import { Module } from '@nestjs/common';
import { CategoryModule } from './user/category/category.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, CategoryModule]
})
export class ApiModule {}
