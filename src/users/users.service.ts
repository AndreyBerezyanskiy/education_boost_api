import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@gmail.com',
      role: 'USER',
    },
  ];

  getAll(role?: 'ADMIN' | 'USER', name?: string) {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);

      if (rolesArray.length === 0) {
        throw new NotFoundException(`User with role ${role} not found`);
      }

      return rolesArray;
    }

    if (name) {
      return this.users.filter((user) => user.name === name);
    }

    return this.users;
  }

  getOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  create(user: CreateUserDto) {
    const userHighestId = [...this.users].sort((a, b) => b.id - a.id)[0];
    const newId = Number(userHighestId.id) + 1;
    const newUser = { ...user, id: newId };
    this.users.push(newUser);

    return newUser;
  }

  update(id: number, userUpdate: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...userUpdate };
      }

      return user;
    });

    return this.getOne(id);
  }

  delete(id: number) {
    const removedUser = this.getOne(id);
    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
