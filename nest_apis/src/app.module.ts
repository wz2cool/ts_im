import { Module } from '@nestjs/common';
import { AppController, GroupsController, UserGroupCategoryController, UserGroupController } from './controller';
import { DbCoreService, GroupService, UserGroupCategoryService, UserGroupService } from './service';

@Module({
  imports: [],
  controllers: [
    AppController,
    GroupsController,
    UserGroupController,
    UserGroupCategoryController],
  components: [
    DbCoreService,
    GroupService,
    UserGroupService,
    UserGroupCategoryService],
})
export class AppModule { }
