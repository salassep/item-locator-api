import { Item, User } from "@prisma/client";
import { CreateItemRequest, GetItemsRequest, ItemResponse, toItemResponse, UpdateItemRequest } from "../models/item-model";
import { Validation } from "../validations/validation";
import { ItemValidation } from "../validations/item-validation";
import { LocationService } from "./location-service";
import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";
import { toLocationResponse } from "../models/location-model";
import { Pageable } from "../models/page";

export class ItemService {

  static async create(user: User, request: CreateItemRequest): Promise<ItemResponse> {
    const createRequest = Validation.validate(ItemValidation.CREATE, request);
    await LocationService.checkLocationExists(user.id, createRequest.locationId);

    const item = await prismaClient.item.create({
      data: createRequest
    });

    return toItemResponse(item);
  }
  
  static async getAll(user: User, request: GetItemsRequest): Promise<Pageable<ItemResponse>> {
    const getRequest = Validation.validate(ItemValidation.SEARCH, request);
    const skip = (getRequest.page - 1) * getRequest.size;

    const filters = [];

    if (getRequest.name) {
      filters.push({
        name: {
          contains: getRequest.name
        }
      });
    }

    if (getRequest.locationId) {
      filters.push({
        locationId: getRequest.locationId
      });
    }

    const items = await prismaClient.item.findMany({
      where: {
        location: {
          userId: user.id,
        },
        AND: filters
      },
      take: getRequest.size,
      skip: skip,
    });

    const total = await prismaClient.item.count({
      where: {
        location: {
          userId: user.id,
        },
        AND: filters
      }
    });

    return {
      data: items.map(item => toItemResponse(item)),
      paging: {
        size: getRequest.size,
        totalPage: Math.ceil(total / getRequest.size),
        currentPage: getRequest.page
      }
    }
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
