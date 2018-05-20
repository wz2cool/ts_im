import { Module } from '@nestjs/common';
import { AppController, GroupsController } from './controller';
import { DbCoreService, GroupService, UserGroupCategoryService } from './service';
import { UserGroupCategoryController } from 'controller/user-group-category.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    GroupsController,
    UserGroupCategoryController],
  components: [
    DbCoreService,
    GroupService,
    UserGroupCategoryService],
})
export class AppModule { }
