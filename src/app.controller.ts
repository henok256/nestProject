import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/henok')
  getJando(): string {
    return this.appService.getName('jando');
  }

  @Post('/addUser')
  addStudent(@Body() body: { age: number; name: string }): string {
    const { name, age } = body;
    return this.appService.getName(name + age);
  }
}
