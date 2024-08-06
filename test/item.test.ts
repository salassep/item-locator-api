import supertest from 'supertest';
import { UserTest, LocationTest, ItemTest } from './test-util';
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

describe('GET /api/items/:itemId', () => {

  beforeEach(async () => {
    await UserTest.create();
    await LocationTest.create();
    await ItemTest.create();
  });

  afterEach(async () =>  {
    await ItemTest.delete();
    await LocationTest.delete();
    await UserTest.delete();
  });

  it('should be able to get item', async () => {
    const item = await ItemTest.get();
    const response = await supertest(app)
      .get(`/api/items/${item.id}`)
      .set('X-API-TOKEN', "test")
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(item.id);
    expect(response.body.data.name).toBe(item.name);
    expect(response.body.data.description).toBe(item.description);
    expect(response.body.data.locationId).toBe(item.locationId);
  });

  it('should reject get item if item is not found', async () => {
    const item = await ItemTest.get();
    const response = await supertest(app)
      .get(`/api/items/${item.id + 1}`)
      .set('X-API-TOKEN', "test")
    
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it('should reject get item if token is invalid', async () => {
    const item = await ItemTest.get();
    const response = await supertest(app)
      .get(`/api/items/${item.id + 1}`)
      .set('X-API-TOKEN', "test_2")
    
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

});

describe('PUT /api/items/:itemId', () => {

  beforeEach(async () => {
    await UserTest.create();
    await LocationTest.create();
    await ItemTest.create();
  });

  afterEach(async () =>  {
    await ItemTest.delete();
    await LocationTest.delete();
    await UserTest.delete();
  });

  it('should be able to update item', async () => {
    const item = await ItemTest.get();
    const response = await supertest(app)
      .put(`/api/items/${item.id}`)
      .set('X-API-TOKEN', "test")
      .send({
        name: "new test item",
        description: "new description item",
        locationId: item.locationId
      })
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(item.id);
    expect(response.body.data.name).toBe("new test item");
    expect(response.body.data.description).toBe("new description item");
    expect(response.body.data.locationId).toBe(item.locationId);
  });

  it('should reject update item if request is invalid', async () => {
    const item = await ItemTest.get();
    const response = await supertest(app)
      .put(`/api/items/${item.id}`)
      .set('X-API-TOKEN', "test")
      .send({
        name: "",
        description: "new description item",
        locationId: item.locationId
      })
    
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should reject update item if item is not exists', async () => {
    const item = await ItemTest.get();
    const response = await supertest(app)
      .put(`/api/items/${item.id + 1}`)
      .set('X-API-TOKEN', "test")
      .send({
        name: "new test item",
        description: "new description item",
        locationId: item.locationId
      })
    
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it('should reject update item if location is not exists', async () => {
    const item = await ItemTest.get();
    const response = await supertest(app)
      .put(`/api/items/${item.id}`)
      .set('X-API-TOKEN', "test")
      .send({
        name: "new test item",
        description: "new description item",
        locationId: item.locationId + 1
      })
    
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it('should reject update item if token is not valid', async () => {
    const item = await ItemTest.get();
    const response = await supertest(app)
      .put(`/api/items/${item.id}`)
      .set('X-API-TOKEN', "test_2")
      .send({
        name: "new test item",
        description: "new description item",
        locationId: item.locationId
      })
    
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

});


describe('DELETE /api/items/:itemId', () => {

  beforeEach(async () => {
    await UserTest.create();
    await LocationTest.create();
    await ItemTest.create();
  });

  afterEach(async () =>  {
    await ItemTest.delete();
    await LocationTest.delete();
    await UserTest.delete();
  });

  it('should be able to delete item', async () => {
    const item = await ItemTest.get();
    const response = await supertest(app)
      .delete(`/api/items/${item.id}`)
      .set("X-API-TOKEN", "test");
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe('OK');
  });

  it('should reject delete item if item is not exists', async () => {
    const item = await ItemTest.get();
    const response = await supertest(app)
      .delete(`/api/items/${item.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it('should reject delete item if token is invalid', async () => {
    const item = await ItemTest.get();
    const response = await supertest(app)
      .delete(`/api/items/${item.id + 1}`)
      .set("X-API-TOKEN", "test_2");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

});

describe('GET /api/items', () => {

  beforeEach(async () => {
    await UserTest.create();
    await LocationTest.create();
    await ItemTest.create();
  });

  afterEach(async () =>  {
    await ItemTest.delete();
    await LocationTest.delete();
    await UserTest.delete();
  });

  it('should be able to search item using name', async () => {
    const response = await supertest(app)
      .get('/api/items')
      .query({
        name: "test",
      })
      .set("X-API-TOKEN", "test");
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.currentPage).toBe(1);
    expect(response.body.paging.totalPage).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it('should be able to search item using location id', async () => {
    const location = await LocationTest.get();
    const response = await supertest(app)
      .get('/api/items')
      .query({
        locationId: location.id
      })
      .set("X-API-TOKEN", "test");
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.currentPage).toBe(1);
    expect(response.body.paging.totalPage).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it('should be able to search item with no result', async() => {
    const response = await supertest(app)
      .get('/api/items')
      .query({
        name: "wrong",
      })
      .set("X-API-TOKEN", "test");
  
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
    expect(response.body.paging.currentPage).toBe(1);
    expect(response.body.paging.totalPage).toBe(0);
    expect(response.body.paging.size).toBe(10);
  });

  it('should be able to search item with paging', async() => {
    const response = await supertest(app)
      .get('/api/items')
      .query({
        page: 2,
        size: 1
      })
      .set("X-API-TOKEN", "test");
  
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
    expect(response.body.paging.currentPage).toBe(2);
    expect(response.body.paging.totalPage).toBe(1);
    expect(response.body.paging.size).toBe(1);
  });
});
