import { Academy, Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export interface AcademyRepository {
  createAcademy(academy: Prisma.AcademyCreateInput): Promise<Academy>;
  getAcademyById(id: string): Promise<Academy | null>;
  getAcademyByEmail(email: string): Promise<Academy | null>;
  updateAcademy(id: string, academy: Prisma.AcademyUpdateInput): Promise<Academy>;
  deleteAcademy(id: string): Promise<Academy>;
  getAllAcademies(): Promise<Academy[]>;
}

export default function AcademyRepository(prisma: PrismaClient): AcademyRepository {
  async function createAcademy(academy: Prisma.AcademyCreateInput): Promise<Academy> {
    const hashedPassword = await bcrypt.hash(academy.password, 10);
    return await prisma.academy.create({
      data: { ...academy, password: hashedPassword },
    });
  }

  async function getAcademyById(id: string): Promise<Academy | null> {
    return await prisma.academy.findUnique({
      where: {
        id: id,
      },
    });
  }

  async function getAcademyByEmail(email: string): Promise<Academy | null> {
    return await prisma.academy.findUnique({
      where: {
        email: email,
      },
    });
  }

  async function updateAcademy(id: string, academy: Prisma.AcademyUpdateInput): Promise<Academy> {
    return await prisma.academy.update({
      where: {
        id: id,
      },
      data: academy,
    });
  }

  async function deleteAcademy(id: string): Promise<Academy> {
    return await prisma.academy.delete({
      where: {
        id: id,
      },
    });
  }

  async function getAllAcademies(): Promise<Academy[]> {
    const academies = await prisma.academy.findMany();

    const academiesWithoutPassword = academies.map((academy) => {
      return { ...academy, password: "" };
    });

    return academiesWithoutPassword;
  }

  return {
    createAcademy,
    getAcademyById,
    getAcademyByEmail,
    updateAcademy,
    deleteAcademy,
    getAllAcademies,
  };
}
