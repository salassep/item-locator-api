import { Item } from "@prisma/client";

export type ItemResponse = {
  id: number,
  name: string,
  description?: string | null,
  locationId: number
}

export type CreateItemRequest = {
  name: string,
  description?: string,
  locationId: number
}

export type UpdateItemRequest = {
  name: string, 
  description?: string,
  locationId: number
}

export type GetItemsRequest = {
  name?: string,
  locationId?:number,
  page: number,
  size: number
}

export function toItemResponse(item: Item): ItemResponse {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    locationId: item.locationId
  }
}

