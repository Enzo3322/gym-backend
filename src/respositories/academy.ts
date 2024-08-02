import { Academy, Prisma, PrismaClient } from "@prisma/client";

export default class AcademyRepository {
  constructor(readonly prisma: PrismaClient) {}

  public async createAcademy(academy: Prisma.AcademyCreateInput): Promise<Academy> {
    return await this.prisma.academy.create({
      data: academy,
    });
  }

  public async getAcademyById(id: string): Promise<Academy | null> {
    return await this.prisma.academy.findUnique({
      where: {
        id: id,
      },
    });
  }

  public async getAcademyByEmail(email: string): Promise<Academy | null> {
    return await this.prisma.academy.findUnique({
      where: {
        email: email,
      },
    });
  }

  public async updateAcademy(id: string, academy: Prisma.AcademyUpdateInput): Promise<Academy> {
    return await this.prisma.academy.update({
      where: {
        id: id,
      },
      data: academy,
    });
  }

  public async deleteAcademy(id: string): Promise<Academy> {
    return await this.prisma.academy.delete({
      where: {
        id: id,
      },
    });
  }

  public async getAllAcademies(): Promise<Academy[]> {
    return await this.prisma.academy.findMany();
  }
}
