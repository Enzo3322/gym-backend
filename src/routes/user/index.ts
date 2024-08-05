import { PrismaClient } from "@prisma/client";
import { FastifyPluginAsync } from "fastify";
import UserController from "../../controllers/user";
import UserRepository from "../../respositories/user";
import UserService from "../../services/user";

const makeController = () => {
  const prisma = new PrismaClient();
  const userRepository = UserRepository(prisma);
  const userService = UserService(userRepository);
  const userController = UserController(userService);

  return userController;
};
const userRouter: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const userController = makeController();

  fastify.get("/", userController.getAllUsers);
  fastify.get("/:id", userController.getUserById);
  fastify.post("/", userController.createUser);
  fastify.put("/:id", userController.updateUser);
  fastify.delete("/:id", userController.deleteUser);
};

export default userRouter;
