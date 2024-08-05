import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { CreateLocationRequest } from "../models/location-model";
import { LocationService } from "../services/location-service";

export class LocationController {

  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateLocationRequest = req.body as CreateLocationRequest;
      const response = await LocationService.create(req.user!, request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

}
