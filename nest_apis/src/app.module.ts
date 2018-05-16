import { Module } from '@nestjs/common';
import { AppController, GroupsController } from './controller';

@Module({
  imports: [],
  controllers: [AppController, GroupsController],
  components: [],
})
export class AppModule { }
