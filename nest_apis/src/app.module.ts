import { Module } from '@nestjs/common';
import { AppController, GroupsController, UserGroupCategoryController, UserGroupController, UserController } from './controller';
import {
  DbCoreService,
  GroupService,
  UserGroupCategoryService,
  UserGroupService,
  UserService,
} from './service';

@Module({
  imports: [],
  controllers: [
    AppController,
    GroupsController,
    UserController,
    UserGroupController,
    UserGroupCategoryController],
  components: [
    DbCoreService,
    GroupService,
    UserGroupService,
    UserGroupCategoryService,
    UserService],
})
export class AppModule { }
