import { Prisma, PrismaClient, User } from "@prisma/client";

import bcrypt from "bcrypt";

export interface UserRepository {
  createUser(user: Prisma.UserCreateInput): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  deleteUser(id: string): Promise<User>;
  getAllUsers(): Promise<User[]>;
}

export default function UserRepository(prisma: PrismaClient) {
  async function createUser(user: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  async function getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async function deleteUser(id: string): Promise<User> {
    return await prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  async function getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  return {
    createUser,
    getUserByEmail,
    deleteUser,
    getAllUsers,
  };
}
