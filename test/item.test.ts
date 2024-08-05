import supertest from 'supertest';
import { UserTest, LocationTest, ItemTest } from './test-util.test';
import { app } from '../src/applications/app';
import { logger } from '../src/applications/logging';

describe('POST /api/items', () => {

  beforeEach(async () => {
    await UserTest.create();
    await LocationTest.create();
  });

  afterEach(async () =>  {
    await ItemTest.delete();
    await LocationTest.delete();
    await UserTest.delete();
  });

  it('should be able to create item', async () => {
    const location = await LocationTest.get();
    const response = await supertest(app)
      .post('/api/items')
      .set('X-API-TOKEN', "test")
      .send({
        name: "test item",
        description: "description item",
        locationId: location.id
      });
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.name).toBe("test item");
    expect(response.body.data.description).toBe("description item");
    expect(response.body.data.locationId).toBe(location.id);
  });

  it('should reject create item if request is invalid', async () => {
    const location = await LocationTest.get();
    const response = await supertest(app)
      .post('/api/items')
      .set('X-API-TOKEN', "test")
      .send({
        name: "",
        description: "description item",
        locationId: location.id
      });
    
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should reject create item if location is not exists', async () => {
    const location = await LocationTest.get();
    const response = await supertest(app)
      .post('/api/items')
      .set('X-API-TOKEN', "test")
      .send({
        name: "test item",
        description: "description item",
        locationId: location.id + 1
      });
    
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });


});