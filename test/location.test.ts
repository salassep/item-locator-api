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

describe('GET /api/locations/:locationId', () => {
  
  beforeEach(async () => {
    await UserTest.create();
    await LocationTest.create();
  });

  afterEach(async () =>  {
    await LocationTest.delete();
    await UserTest.delete();
  });

  it('should be able to get location', async () => {
    const location = await LocationTest.get();
    const response = await supertest(app)
      .get(`/api/locations/${location.id}`)
      .set("X-API-TOKEN", "test")
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(location.id);
    expect(response.body.data.name).toBe(location.name);
    expect(response.body.data.description).toBe(location.description);
  });

  it('should reject get location if location is not found', async () => {
    const location = await LocationTest.get();
    const response = await supertest(app)
      .get(`/api/locations/${location.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it('should reject get location if token is not valid', async () => {
    const location = await LocationTest.get();
    const response = await supertest(app)
      .get(`/api/locations/${location.id + 1}`)
      .set("X-API-TOKEN", "test_2");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

});


describe('PUT /api/locations/:locationId', () => {

  beforeEach(async () => {
    await UserTest.create();
    await LocationTest.create();
  });

  afterEach(async () =>  {
    await LocationTest.delete();
    await UserTest.delete();
  });

  it('should be able to update location', async () => {
    const location = await LocationTest.get();
    const response = await supertest(app)
      .put(`/api/locations/${location.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        name: "new test location",
        description: "new description location",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(location.id);
    expect(response.body.data.name).toBe("new test location");
    expect(response.body.data.description).toBe("new description location");
  });

  it('should reject update location if request is invalid', async () => {
    const location = await LocationTest.get();
    const response = await supertest(app)
      .put(`/api/locations/${location.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        name: "",
        description: "new description location",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should reject update location if location is not exists', async () => {
    const location = await LocationTest.get();
    const response = await supertest(app)
      .put(`/api/locations/${location.id + 1}`)
      .set("X-API-TOKEN", "test")
      .send({
        name: "new test location",
        description: "new description location",
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

});

describe('DELETE /api/locations/:locationId', () => {

  beforeEach(async () => {
    await UserTest.create();
    await LocationTest.create();
  });

  afterEach(async () =>  {
    await LocationTest.delete();
    await UserTest.delete();
  });

  it('should be able to delete location', async () => {
    const location = await LocationTest.get();
    const response = await supertest(app)
      .delete(`/api/locations/${location.id}`)
      .set("X-API-TOKEN", "test");
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });

  it('should reject delete location if location is not exists', async () => {
    const location = await LocationTest.get();
    const response = await supertest(app)
      .delete(`/api/locations/${location.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

});
