import { PrismaClient } from "@prisma/client";
import { FastifyPluginAsync } from "fastify";
import AcademyController from "../../controllers/academy";
import AcademyRepository from "../../respositories/academy";
import AcademyService from "../../services/academy";

const academyRouter: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const prisma = new PrismaClient();
  const academyRepository = AcademyRepository(prisma);
  const academyService = AcademyService(academyRepository);
  const academyController = AcademyController(academyService);

  fastify.get("/", academyController.getAllAcademies);
  fastify.get("/:id", academyController.getAcademyById);
  fastify.post("/", academyController.createAcademy);
  fastify.put("/:id", academyController.updateAcademy);
  fastify.delete("/:id", academyController.deleteAcademy);
};

export default academyRouter;
