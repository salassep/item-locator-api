import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { CreateLocationRequest, GetLocationsRequest, UpdateLocationRequest } from "../models/location-model";
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

  static async getAll(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: GetLocationsRequest = {
        name: req.query.name as string,
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 10,
      }
      const response = await LocationService.getAll(req.user!, request);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const locationId = Number(req.params.locationId);
      const response = await LocationService.get(req.user!, locationId);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateLocationRequest = req.body as UpdateLocationRequest;
      request.id = Number(req.params.locationId);

      const response = await LocationService.update(req.user!, request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async remove(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const locationId = Number(req.params.locationId);
      await LocationService.remove(req.user!, locationId);
      res.status(200).json({
        data: "OK",
      });
    } catch (e) {
      next(e);
    }
  }

}
