import { User } from "@prisma/client";
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

}
