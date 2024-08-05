import { z, ZodType } from "zod";

export class LocationValidation {

  static readonly CREATE : ZodType = z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(255).optional(),
  });

  static readonly UPDATE : ZodType = z.object({
    id: z.number().positive(),
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(255).optional(),
  });

}
