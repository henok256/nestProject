import {Controller, Get, Post,Body,Patch,Param,Delete, Query} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import {Prisma} from '@prisma/client';
import {ApiQuery} from '@nestjs/swagger';



@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    //const roleEnum=Role[createEmployeeDto.role as keyof typeof]
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @ApiQuery({ name: 'role', required: false})
  findAll(@Query('role') role?:'INTERN'|'ENGINEER' | 'ADMIN') {
    return this.employeesService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
