import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IUserRepository } from '../../domain/user/repositories/user.repository';
import { User } from '../../domain/user/entities/user.entity';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        role: user.role,
        name: user.name,
      },
    });
    return new User(
      created.id,
      created.email,
      created.password,
      created.role as 'Customer' | 'Admin' | 'Delivery',
      created.name ?? undefined
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await this.prisma.user.findUnique({ where: { email } });
    return found
      ? new User(
          found.id,
          found.email,
          found.password,
          found.role as 'Customer' | 'Admin' | 'Delivery',
          found.name ?? undefined
        )
      : null;
  }
}