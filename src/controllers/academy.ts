import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import AcademyService from "../services/academy";
import { zodAcademy } from "../zod/zod";

export default class AcademyController {
  constructor(readonly academyService: AcademyService) {}

  public async createAcademy(req: FastifyRequest, res: FastifyReply) {
    try {
      const academy = zodAcademy.parse(req.body);
      const newAcademy = await this.academyService.createAcademy(academy);
      res.status(201).send(newAcademy);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  public async getAcademyById(req: FastifyRequest, res: FastifyReply) {
    const zod = z.object({ id: z.string() });
    try {
      const { id } = zod.parse(req.params);
      const academy = await this.academyService.getAcademyById(id);
      res.status(200).send(academy);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  public async updateAcademy(req: FastifyRequest, res: FastifyReply) {
    const zod = z.object({ id: z.string() });

    try {
      const { id } = zod.parse(req.params);
      const academy = zodAcademy.parse(req.body);
      const updatedAcademy = await this.academyService.updateAcademy(id, academy);
      res.status(200).send(updatedAcademy);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  public async deleteAcademy(req: FastifyRequest, res: FastifyReply) {
    const zod = z.object({ id: z.string() });
    try {
      const { id } = zod.parse(req.params);
      const deletedAcademy = await this.academyService.deleteAcademy(id);
      res.status(200).send(deletedAcademy);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  public async getAllAcademies(req: FastifyRequest, res: FastifyReply) {
    try {
      const academies = await this.academyService.getAllAcademies();
      res.status(200).send(academies);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
}
