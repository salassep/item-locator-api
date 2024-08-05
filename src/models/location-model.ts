import { Location } from "@prisma/client";

export type LocationResponse = {
  id: number;
  name: string,
  description?: string | null,
}

export type CreateLocationRequest = {
  name: string,
  description?: string,
}

export type UpdateLocationRequest = {
  id: number,
  name: string,
  description?: string,
}

export function toLocationResponse(location: Location): LocationResponse {
  return {
    id: location.id,
    name: location.name,
    description: location.description,
  }
}
