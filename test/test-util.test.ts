import { Item, Location, User } from "@prisma/client";
import { prismaClient } from "../src/applications/database";
import bcrypt from "bcrypt";

export class UserTest {

  static async delete() {
    await prismaClient.user.deleteMany({});
  }

  static async create() {
    await prismaClient.user.createMany({
      data: [
        {
          username: "test",
          name: "test",
          password: await bcrypt.hash("test", 10),
          token: "test"
        },
        {
          username: "test_2",
          name: "test_2",
          password: await bcrypt.hash("test_2", 10),
          token: "test_2"
        }
      ]
    });
  }

  static async get(): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        username: "test"
      }
    });

    if (!user) {
      throw new Error("user is not found");
    }

    return user;
  }

}

export class LocationTest {

  static async delete() {
    await prismaClient.location.deleteMany({});
  }

  static async create() {
    const user = await UserTest.get();
    await prismaClient.location.create({
      data: {
        name: "test location",
        description: "description location",
        userId: user.id
      }
    });
  }

  static async get(): Promise<Location> {
    const user = await UserTest.get();
    const location  = await prismaClient.location.findFirst({
      where: {
        userId: user.id
      }
    });

    if (!location) {
      throw new Error("location is not found");
    }

    return location;
  }

}

export class ItemTest {

  static async delete() {
    await prismaClient.item.deleteMany({});
  } 

  static async create() {
    const location = await LocationTest.get();
    await prismaClient.item.create({
      data:{
        name: "test item",
        description: "description item",
        locationId: location.id,
      }
    });
  }

  static async get(): Promise<Item> {
    const location = await LocationTest.get();
    const item = await prismaClient.item.findFirst({
      where: {
        locationId: location.id
      }
    });

    if (!item) {
      throw new Error("item is not found");
    }

    return item;
  }

}
