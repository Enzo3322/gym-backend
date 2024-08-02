import { Prisma, User } from "@prisma/client";
import bcrypt from "bcrypt";
import UserRepository from "../respositories/user";

export default class UserService {
  constructor(readonly userRepository: UserRepository) {}

  public async createUser(user: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await this.userRepository.createUser({
      ...user,
      password: hashedPassword,
    });
  }

  public async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.getUserById(id);
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.getUserByEmail(email);
  }

  public async updateUser(id: string, user: Prisma.UserUpdateInput): Promise<User> {
    return await this.userRepository.updateUser(id, user);
  }

  public async deleteUser(id: string): Promise<User> {
    return await this.userRepository.deleteUser(id);
  }

  public async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }

  public async login(email: string, password: string): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return user;
  }

  public async changePassword(id: string, oldPassword: string, newPassword: string): Promise<User> {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await this.userRepository.updateUser(id, {
      password: hashedPassword,
    });
  }

  public async changeEmail(id: string, email: string): Promise<User> {
    return await this.userRepository.updateUser(id, {
      email: email,
    });
  }

  public async changeName(id: string, name: string): Promise<User> {
    return await this.userRepository.updateUser(id, {
      name: name,
    });
  }
}
