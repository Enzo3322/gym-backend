import { Prisma } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { UserService } from "../services/user";

export default function UserController(userService: UserService) {
  async function createUser(req: FastifyRequest, res: FastifyReply) {
    try {
      const user = req.body as Prisma.UserCreateInput;
      const newUser = await userService.createUser(user);
      res.status(201).send(newUser);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  async function deleteUser(req: FastifyRequest, res: FastifyReply) {
    const zod = z.object({ id: z.string() });
    try {
      const { id } = zod.parse(req.params);
      const deletedUser = await userService.deleteUser(id);
      res.status(200).send(deletedUser);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  async function getAllUsers(req: FastifyRequest, res: FastifyReply) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).send(users);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
  return {
    createUser,
    deleteUser,
    getAllUsers,
  };
}
