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
  RequestController,
  MessageController,
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
  RequestService,
  MessageService,
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
    RequestController,
    MessageController,
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
    RequestService,
    MessageService,
  ],
})
export class AppModule { }
