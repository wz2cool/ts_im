import { Get, Controller, Post, Body, Request, Response } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root(): string {
    return 'Hello World!';
  }
}
