import { app } from '../src/applications/app';
import supertest from "supertest";
import { logger } from '../src/applications/logging';
import { UserTest } from './test-util.test';

describe('POST /api/users', () => {
  
  afterEach(async () => {
    await UserTest.delete();
  });

  const endpoint = '/api/users';

  it('should reject register new user if request is invalid', async () => {
    const response = await supertest(app)
      .post(endpoint)
      .send({
        username: "",
        password: "",
        name: ""
      });
    
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should register new user', async () => {
    const response = await supertest(app)
      .post(endpoint)
      .send({
        username: "test",
        password: "test",
        name: "test"
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });

});
