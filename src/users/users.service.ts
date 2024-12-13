import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'Diana Prince',
      email: 'diana.prince@example.com',
      role: 'ADMIN',
    },
    {
      id: 5,
      name: 'Ethan Hunt',
      email: 'ethan.hunt@example.com',
      role: 'ENGINEER',
    },
    {
      id: 6,
      name: 'Fiona Gallagher',
      email: 'fiona.gallagher@example.com',
      role: 'INTERN',
    },
    {
      id: 7,
      name: 'George Miller',
      email: 'george.miller@example.com',
      role: 'ADMIN',
    },
    {
      id: 8,
      name: 'Hannah Davis',
      email: 'hannah.davis@example.com',
      role: 'ENGINEER',
    },
  ];

  // findAll(role?: 'ENGINEER' | 'INTERN'| 'ADMIN'){
  //   if(role==='ENGINEER'|| role==="INTERN" || role==='ADMIN'){
  //       return this.users.filter(user=>user.role===role)
  //   } else{
  //       throw new NotFoundException("user not found with the given role");
  //   }
  // }

  findAll(role?: 'ENGINEER' | 'INTERN' | 'ADMIN') {
    if (role) {
      const arrayRoles = this.users.filter((user) => user.role === role);
      if (arrayRoles.length === 0) {
        throw new NotFoundException('user not found');
      }
      return arrayRoles;
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new NotFoundException(`user with id number ${id} not found`);
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);

    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removeUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);
    return removeUser;
  }
}
