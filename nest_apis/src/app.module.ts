import { Module } from '@nestjs/common';
import {
  AppController,
  GroupsController,
  UserGroupCategoryController,
  UserGroupController,
  UserController,
  UserDetailController,
  UserFriendController,
  UserFriendCategoryController,
} from './controller';
import {
  DbCoreService,
  GroupService,
  UserGroupCategoryService,
  UserGroupService,
  UserService,
  UserDetailService,
  UserFriendService,
  UserFriendCategoryService,
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
    UserFriendCategoryController,
  ],
  components: [
    DbCoreService,
    GroupService,
    UserGroupService,
    UserGroupCategoryService,
    UserDetailService,
    UserFriendService,
    UserFriendCategoryService,
    UserService],
})
export class AppModule { }
