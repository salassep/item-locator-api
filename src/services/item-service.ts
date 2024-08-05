import { User } from "@prisma/client";
import { CreateItemRequest, ItemResponse, toItemResponse } from "../models/item-model";
import { Validation } from "../validations/validation";
import { ItemValidation } from "../validations/item-validation";
import { LocationService } from "./location-service";
import { prismaClient } from "../applications/database";

export class ItemService {

  static async create(user: User, request: CreateItemRequest): Promise<ItemResponse> {
    const createRequest = Validation.validate(ItemValidation.CREATE, request);
    await LocationService.checkLocationExists(user.id, createRequest.locationId);

    const item = await prismaClient.item.create({
      data: createRequest
    });

    return toItemResponse(item);
  }

}
