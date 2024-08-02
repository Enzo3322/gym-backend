import { Prisma } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import UserService from "../services/user";
import { zodUser } from "../zod/zod";

export default class UserController {
  constructor(readonly userService: UserService) {}

  public async createUser(req: FastifyRequest, res: FastifyReply) {
    try {
      const user = req.body as Prisma.UserCreateInput;
      const newUser = await this.userService.createUser(user);
      res.status(201).send(newUser);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  public async getUserById(req: FastifyRequest, res: FastifyReply) {
    const zod = z.object({ id: z.string() });
    try {
      const { id } = zod.parse(req.params);
      const user = await this.userService.getUserById(id);
      res.status(200).send(user);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  public async updateUser(req: FastifyRequest, res: FastifyReply) {
    const zod = z.object({ id: z.string() });

    try {
      const { id } = zod.parse(req.params);
      const user = zodUser.parse(req.body);
      const updatedUser = await this.userService.updateUser(id, user);
      res.status(200).send(updatedUser);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  public async deleteUser(req: FastifyRequest, res: FastifyReply) {
    const zod = z.object({ id: z.string() });
    try {
      const { id } = zod.parse(req.params);
      const deletedUser = await this.userService.deleteUser(id);
      res.status(200).send(deletedUser);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  public async getAllUsers(req: FastifyRequest, res: FastifyReply) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).send(users);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
}
