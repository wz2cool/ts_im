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
  AuthController,
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
  AuthService,
} from './service';

import { JwtStrategy } from './jwt/jwt.strategy';

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
    AuthController,
  ],
  providers: [
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
    AuthService,
    JwtStrategy,
  ],
})
export class AppModule { }
