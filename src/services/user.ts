import { Prisma, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { UserRepository } from "../respositories/user";

export interface UserService {
  createUser(user: Prisma.UserCreateInput): Promise<User>;
  deleteUser(id: string): Promise<User>;
  getAllUsers(): Promise<User[]>;
  login(email: string, password: string): Promise<User>;
}

export default function UserService(userRepository: UserRepository) {
  async function createUser(user: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await userRepository.createUser({
      ...user,
      password: hashedPassword,
    });
  }

  async function deleteUser(id: string): Promise<User> {
    return await userRepository.deleteUser(id);
  }

  async function getAllUsers(): Promise<User[]> {
    return await userRepository.getAllUsers();
  }

  async function login(email: string, password: string): Promise<User> {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return user;
  }

  return {
    createUser,
    deleteUser,
    getAllUsers,
    login,
  };
}
