import { Injectable } from '@nestjs/common';
import { Tasks } from '@nx-react-shared-components/shared-types';

@Injectable()
export class AppService {
  private tasks: Tasks[] = [];

  getTasks(): Tasks[] {
    return this.tasks;
  }

  addTask(text: string): void {
    this.tasks.push({
      id: this.tasks.length,
      text,
    });
  }

  removeTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
