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
  UserConversationController,
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
  UserConversationService,
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
    UserConversationController,
  ],
  components: [
    DbCoreService,
    GroupService,
    UserGroupService,
    UserGroupCategoryService,
    UserDetailService,
    UserFriendService,
    UserFriendCategoryService,
    UserService,
    UserConversationService,
  ],
})
export class AppModule { }
