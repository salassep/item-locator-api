import { z, ZodType } from "zod";

export class ItemValidation {
  
  static readonly CREATE : ZodType = z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(255).optional(),
    locationId: z.number().positive()
  })

}
