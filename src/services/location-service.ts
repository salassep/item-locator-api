import { Location, User } from "@prisma/client";
import { CreateLocationRequest, GetLocationsRequest, LocationResponse, toLocationResponse, UpdateLocationRequest } from "../models/location-model";
import { Validation } from "../validations/validation";
import { LocationValidation } from "../validations/location-validation";
import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";
import { Pageable } from "../models/page";

export class LocationService {

  static async create(user: User, request: CreateLocationRequest): Promise<LocationResponse> {
    const createRequest = Validation.validate(LocationValidation.CREATE, request);

    const record = {
      ...createRequest,
      ...{userId: user.id},
    }

    const location = await prismaClient.location.create({
      data: record,
    });

    return toLocationResponse(location);
  }

  static async getAll(user: User, request:GetLocationsRequest): Promise<Pageable<LocationResponse>> {
    const getRequest = Validation.validate(LocationValidation.SEARCH, request);
    const skip = (getRequest.page - 1) * getRequest.size;

    const locations = await prismaClient.location.findMany({
      where: {
        userId: user.id,
        name: {
          contains: getRequest.name,
        }
      },
      take: getRequest.size,
      skip: skip,
    });
    
    const total = await prismaClient.location.count({
      where: {
        userId: user.id,
        name: {
          contains: getRequest.name,
        }
      },
    });

    return {
      data: locations.map(location => toLocationResponse(location)),
      paging: {
        size: getRequest.size,
        totalPage: Math.ceil(total / getRequest.size),
        currentPage: getRequest.page,
      }
    }
  }

  static async checkLocationExists(userId: number, locationId: number): Promise<Location> {
    const location = await prismaClient.location.findFirst({
      where: {
        id: locationId,
        userId: userId,
      }
    });

    if (!location) {
      throw new ResponseError(404, 'Location not found');
    }

    return location;
  }

  static async get(user: User, locationId: number): Promise<LocationResponse> {
    const location = await this.checkLocationExists(user.id, locationId);
    return toLocationResponse(location);
  }

  static async update(user: User, request: UpdateLocationRequest): Promise<LocationResponse> {
    const updateRequest = Validation.validate(LocationValidation.UPDATE, request);
    await this.checkLocationExists(user.id, updateRequest.id);

    const location = await prismaClient.location.update({
      where: {
        id: updateRequest.id,
        userId: user.id,
      },
      data: updateRequest
    });

    return toLocationResponse(location);
  }

  static async remove(user: User, locationId: number): Promise<LocationResponse> {
    await this.checkLocationExists(user.id, locationId);

    const location = await prismaClient.location.delete({
      where: {
        id: locationId,
      }
    });

    return toLocationResponse(location);
  }

}
