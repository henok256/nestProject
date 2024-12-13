import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getName(name: string): string {
    return `the name of the student is ${name}`;
  }
}
