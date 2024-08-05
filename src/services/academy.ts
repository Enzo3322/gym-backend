import { Academy, Prisma } from "@prisma/client";
import { AcademyRepository } from "../respositories/academy";

export interface AcademyService {
  createAcademy(academy: Prisma.AcademyCreateInput): Promise<Academy>;
  getAcademyById(id: string): Promise<Academy | null>;
  updateAcademy(id: string, academy: Prisma.AcademyUpdateInput): Promise<Academy>;
  deleteAcademy(id: string): Promise<Academy>;
  getAllAcademies(): Promise<Academy[]>;
}

export default function AcademyService(academyRepository: AcademyRepository) {
  async function createAcademy(academy: Prisma.AcademyCreateInput): Promise<Academy> {
    return await academyRepository.createAcademy(academy);
  }

  async function getAcademyById(id: string): Promise<Academy | null> {
    return await academyRepository.getAcademyById(id);
  }

  async function updateAcademy(id: string, academy: Prisma.AcademyUpdateInput): Promise<Academy> {
    return await academyRepository.updateAcademy(id, academy);
  }

  async function deleteAcademy(id: string): Promise<Academy> {
    return await academyRepository.deleteAcademy(id);
  }

  async function getAllAcademies(): Promise<Academy[]> {
    return await academyRepository.getAllAcademies();
  }

  return {
    createAcademy,
    getAcademyById,
    updateAcademy,
    deleteAcademy,
    getAllAcademies,
  };
}
