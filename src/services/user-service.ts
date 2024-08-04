import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";
import { 
  CreateUserRequest, 
  LoginUserRequest, 
  toUserResponse, 
  UserResponse 
} from "../models/user-model";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class UserService {

  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(UserValidation.REGISTER, request);

    const totalUserWithSameUsername = await prismaClient.user.count({
      where: {
        username: registerRequest.username
      }
    });

    if (totalUserWithSameUsername > 0) {
      throw new ResponseError(400, "Username already exists");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    let user = await prismaClient.user.findUnique({
      where: {
        username: loginRequest.username
      }
    });

    if (!user) {
      throw new ResponseError(401, "Invalid username or password");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

    if (!isPasswordValid) {
      throw new ResponseError(401, "Invalid username or password");
    }

    user = await prismaClient.user.update({
      where: {
        username: loginRequest.username
      },
      data: {
        token: uuid()
      }
    });

    const response = toUserResponse(user);
    response.token = user.token!;

    return response;
  }

}