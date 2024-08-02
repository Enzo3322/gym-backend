import { Academy, Prisma } from "@prisma/client";
import AcademyRepository from "../respositories/academy";

export default class AcademyService {
  constructor(readonly academyRepository: AcademyRepository) {}

  public async createAcademy(academy: Prisma.AcademyCreateInput): Promise<Academy> {
    return await this.academyRepository.createAcademy(academy);
  }

  public async getAcademyById(id: string): Promise<Academy | null> {
    return await this.academyRepository.getAcademyById(id);
  }

  public async updateAcademy(id: string, academy: Prisma.AcademyUpdateInput): Promise<Academy> {
    return await this.academyRepository.updateAcademy(id, academy);
  }

  public async deleteAcademy(id: string): Promise<Academy> {
    return await this.academyRepository.deleteAcademy(id);
  }

  public async getAllAcademies(): Promise<Academy[]> {
    console.log("academyRepository", this.academyRepository);
    return await this.academyRepository.getAllAcademies();
  }
}
