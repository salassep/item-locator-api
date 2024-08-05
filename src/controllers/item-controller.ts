import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { CreateItemRequest, UpdateItemRequest } from "../models/item-model";
import { ItemService } from "../services/item-service";

export class ItemController {

  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateItemRequest = req.body as CreateItemRequest;
      const response = await ItemService.create(req.user!, request);
      res.status(200).json({
        data: response
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const itemId = Number(req.params.itemId);
      const response = await ItemService.get(req.user!, itemId);
      res.status(200).json({
        data: response
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateItemRequest = req.body as UpdateItemRequest;
      request.id = Number(req.params.itemId);

      const response = await ItemService.update(req.user!, request);
      res.status(200).json({
        data: response
      });
    } catch (e) {
      next(e);
    }
  }

}