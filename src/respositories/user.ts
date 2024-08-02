import { Prisma, PrismaClient, User } from "@prisma/client";

import bcrypt from "bcrypt";

export default class UserRepository {
  constructor(readonly prisma: PrismaClient) {}

  public async createUser(user: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return await this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  public async getUserById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  public async updateUser(id: string, user: Prisma.UserUpdateInput): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: user,
    });
  }

  public async deleteUser(id: string): Promise<User> {
    return await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  public async getAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
}
