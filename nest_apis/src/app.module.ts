import { Module } from '@nestjs/common';
import { AppController, GroupsController, UserGroupCategoryController } from './controller';
import { DbCoreService, GroupService, UserGroupCategoryService } from './service';

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
