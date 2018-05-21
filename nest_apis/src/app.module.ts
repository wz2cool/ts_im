import { Module } from '@nestjs/common';
import {
  AppController,
  GroupsController,
  UserGroupCategoryController,
  UserGroupController,
  UserController,
  UserDetailController,
  UserFriendController,
} from './controller';
import {
  DbCoreService,
  GroupService,
  UserGroupCategoryService,
  UserGroupService,
  UserService,
  UserDetailService,
  UserFriendService,
} from './service';

@Module({
  imports: [],
  controllers: [
    AppController,
    GroupsController,
    UserController,
    UserGroupController,
    UserGroupCategoryController,
    UserDetailController,
    UserFriendController,
  ],
  components: [
    DbCoreService,
    GroupService,
    UserGroupService,
    UserGroupCategoryService,
    UserDetailService,
    UserFriendService,
    UserService],
})
export class AppModule { }
