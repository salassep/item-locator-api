import { Item, User } from "@prisma/client";
import { CreateItemRequest, ItemResponse, toItemResponse, UpdateItemRequest } from "../models/item-model";
import { Validation } from "../validations/validation";
import { ItemValidation } from "../validations/item-validation";
import { LocationService } from "./location-service";
import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";
import { toLocationResponse } from "../models/location-model";

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

  static async get(user: User, itemId: number): Promise<ItemResponse> {
    const item = await this.checkItemExists(user.id, itemId);
    return toItemResponse(item);
  }

  static async update(user: User, request: UpdateItemRequest): Promise<ItemResponse> {
    const updateRequest = Validation.validate(ItemValidation.UPDATE, request);
    await LocationService.checkLocationExists(user.id, updateRequest.locationId);
    await this.checkItemExists(user.id, updateRequest.id);

    const item = await prismaClient.item.update({
      where: {
        id: updateRequest.id
      },
      data: updateRequest
    });

    return toItemResponse(item);
  }

  static async remove(user: User, itemId: number): Promise<ItemResponse> {
    await this.checkItemExists(user.id, itemId);

    const item = await prismaClient.item.delete({
      where: {
        id: itemId
      }
    });

    return toItemResponse(item);
  }

}
