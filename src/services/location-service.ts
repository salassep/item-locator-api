import { User } from "@prisma/client";
import { CreateLocationRequest, LocationResponse, toLocationResponse } from "../models/location-model";
import { Validation } from "../validations/validation";
import { LocationValidation } from "../validations/location-validation";
import { prismaClient } from "../applications/database";

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

}
