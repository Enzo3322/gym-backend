import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { AcademyService } from "../services/academy";
import { zodAcademy } from "../zod/zod";

export default function AcademyController(academyService: AcademyService) {
  async function createAcademy(req: FastifyRequest, res: FastifyReply) {
    try {
      const academy = zodAcademy.parse(req.body);
      const newAcademy = await academyService.createAcademy(academy);
      res.status(201).send(newAcademy);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  async function getAcademyById(req: FastifyRequest, res: FastifyReply) {
    const zod = z.object({ id: z.string() });
    try {
      const { id } = zod.parse(req.params);
      const academy = await academyService.getAcademyById(id);
      res.status(200).send(academy);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  async function updateAcademy(req: FastifyRequest, res: FastifyReply) {
    const zod = z.object({ id: z.string() });

    try {
      const { id } = zod.parse(req.params);
      const academy = zodAcademy.parse(req.body);
      const updatedAcademy = await academyService.updateAcademy(id, academy);
      res.status(200).send(updatedAcademy);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  async function deleteAcademy(req: FastifyRequest, res: FastifyReply) {
    const zod = z.object({ id: z.string() });
    try {
      const { id } = zod.parse(req.params);
      const deletedAcademy = await academyService.deleteAcademy(id);
      res.status(200).send(deletedAcademy);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  async function getAllAcademies(req: FastifyRequest, res: FastifyReply) {
    try {
      const academies = await academyService.getAllAcademies();
      res.status(200).send(academies);
    } catch (error: any) {
      console.log({ error });
      res.status(500).send({ message: error.message });
    }
  }

  return {
    createAcademy,
    getAcademyById,
    updateAcademy,
    deleteAcademy,
    getAllAcademies,
  };
}
