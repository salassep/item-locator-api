import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { CreateItemRequest } from "../models/item-model";
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

}