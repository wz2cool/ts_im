import { Get, Controller, Post, Body, Request, Response } from '@nestjs/common';
import { Student } from '../model/student';

@Controller()
export class AppController {
  @Get()
  root(): string {
    return 'Hello World!';
  }

  @Post()
  addStudent(@Body() newStudent: Student): Student {
    return null;
  }
}
