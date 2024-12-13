
import { Injectable, Body } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class EmployeesService {

  constructor(private readonly  databaseService: DatabaseService){}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    
    return this.databaseService.employee.create({
      data:createEmployeeDto,
     
    })

    //return 'This action adds a new employee';
  }

  async findAll(role?:'INTERN'|'ENGINEER' | 'ADMIN') {
    if (role)
       return this.databaseService.employee.findMany({
        where:{
          role,
       }
    })
    return this.databaseService.employee.findMany({})
  }

  async findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where:{
        id:id                   //is the same with id, since both have the same name 
      }
    });
  }

  async update(id: number, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where:{
        id,
      },
      data:updateEmployeeDto
    })
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({
      where:{
        id,
      }
    })
  }
}
