import { Item, User } from "@prisma/client";
import { CreateItemRequest, ItemResponse, toItemResponse } from "../models/item-model";
import { Validation } from "../validations/validation";
import { ItemValidation } from "../validations/item-validation";
import { LocationService } from "./location-service";
import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";

export class ItemService {

  static async create(user: User, request: CreateItemRequest): Promise<ItemResponse> {
    const createRequest = Validation.validate(ItemValidation.CREATE, request);
    await LocationService.checkLocationExists(user.id, createRequest.locationId);

    const item = await prismaClient.item.create({
      data: createRequest
    });

    return toItemResponse(item);
  }

  static async checkItemExists(userId: number, itemId: number): Promise<Item> {
    const item = await prismaClient.item.findFirst({
      where: {
        id: itemId,
        location: {
          userId: userId
        }
      }
    });

    if (!item) {
      throw new ResponseError(404, "item is not found");
    }

    return item;
  }

  static async get(user:User, itemId: number): Promise<ItemResponse> {
    const item = await this.checkItemExists(user.id, itemId);
    return toItemResponse(item);
  }

}
