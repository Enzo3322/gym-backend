import { PrismaClient } from "@prisma/client";
import { FastifyPluginAsync } from "fastify";
import UserController from "../../controllers/user";
import UserRepository from "../../respositories/user";
import UserService from "../../services/user";

const userRouter: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const prisma = new PrismaClient();
  const userRepository = new UserRepository(prisma);
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  fastify.get("/", userController.getAllUsers);
  fastify.get("/:id", userController.getUserById);
  fastify.post("/", userController.createUser);
  fastify.put("/:id", userController.updateUser);
  fastify.delete("/:id", userController.deleteUser);
};

export default userRouter;
