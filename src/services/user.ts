import { Prisma, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { UserRepository } from "../respositories/user";

export interface UserService {
  createUser(user: Prisma.UserCreateInput): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(id: string, user: Prisma.UserUpdateInput): Promise<User>;
  deleteUser(id: string): Promise<User>;
  getAllUsers(): Promise<User[]>;
  login(email: string, password: string): Promise<User>;
  changePassword(id: string, oldPassword: string, newPassword: string): Promise<User>;
  changeEmail(id: string, email: string): Promise<User>;
  changeName(id: string, name: string): Promise<User>;
}

export default function UserService(userRepository: UserRepository) {
  async function createUser(user: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await userRepository.createUser({
      ...user,
      password: hashedPassword,
    });
  }

  async function getUserById(id: string): Promise<User | null> {
    return await userRepository.getUserById(id);
  }

  async function getUserByEmail(email: string): Promise<User | null> {
    return await userRepository.getUserByEmail(email);
  }

  async function updateUser(id: string, user: Prisma.UserUpdateInput): Promise<User> {
    return await userRepository.updateUser(id, user);
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

  async function changePassword(
    id: string,
    oldPassword: string,
    newPassword: string
  ): Promise<User> {
    const user = await userRepository.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await userRepository.updateUser(id, {
      password: hashedPassword,
    });
  }

  async function changeEmail(id: string, email: string): Promise<User> {
    return await userRepository.updateUser(id, {
      email: email,
    });
  }

  async function changeName(id: string, name: string): Promise<User> {
    return await userRepository.updateUser(id, {
      name: name,
    });
  }
  return {
    createUser,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
    getAllUsers,
    login,
    changePassword,
    changeEmail,
    changeName,
  };
}
