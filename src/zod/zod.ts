import z from "zod";

export const zodAcademy = z.object({
  name: z.string(),
  logoUrl: z.string(),
  email: z.string(),
  password: z.string(),
  description: z.string(),
  address: z.string(),
});

export const zodUser = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});
