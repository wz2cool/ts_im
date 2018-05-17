import { Module } from '@nestjs/common';
import { AppController, GroupsController } from './controller';
import { DbCoreService, GroupDbService } from './service';

@Module({
  imports: [],
  controllers: [AppController, GroupsController],
  components: [DbCoreService, GroupDbService],
})
export class AppModule { }
