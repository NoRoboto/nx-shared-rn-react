import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTask() {
    return this.appService.getTasks();
  }

  @Post()
  createTask(@Body() payload: { text: string }) {
    return this.appService.addTask(payload.text);
  }

  @Post()
  removeTask(@Body() payload: { id: number }) {
    return this.appService.removeTask(payload.id);
  }
}
