import { z, ZodType } from "zod";

export class ItemValidation {
  
  static readonly CREATE : ZodType = z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(255).optional(),
    locationId: z.number().positive()
  })

  static readonly UPDATE : ZodType = z.object({
    id: z.number().positive(),
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(255).optional(),
    locationId: z.number().positive()
  })

  static readonly SEARCH : ZodType = z.object({
    name: z.string().optional(),
    locationId: z.number().positive().optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive()
  });

}
