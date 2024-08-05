import supertest from 'supertest';
import { LocationTest, UserTest } from './test-util.test';
import { app } from '../src/applications/app';
import { logger } from '../src/applications/logging';

describe('POST /api/locations', () => {
  
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () =>  {
    await LocationTest.delete();
    await UserTest.delete();
  })

  it('should be able to create location', async () => {
    const response = await supertest(app)
      .post("/api/locations")
      .set("X-API-TOKEN", "test")
      .send({
        name: "test location",
        description: "description location",
      })
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.name).toBe("test location");
    expect(response.body.data.description).toBe("description location");
  });

  it('should reject create new location if data is invalid', async () => {
    const response = await supertest(app)
      .post("/api/locations")
      .set("X-API-TOKEN", "test")
      .send({
        name: "",
        description: "description location",
      })
    
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should reject create new location if token is invalid', async () => {
    const response = await supertest(app)
      .post("/api/locations")
      .set("X-API-TOKEN", "wrong")
      .send({
        name: "test location",
        description: "description location",
      })
    
    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

});