import { app } from '../src/applications/app';
import supertest from "supertest";
import { logger } from '../src/applications/logging';
import { UserTest } from './test-util.test';
import bcrypt from 'bcrypt';

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


describe('POST /api/users/login', () => {

  beforeEach(async() => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it('should be able to login', async () => {
    const response = await supertest(app)
      .post('/api/users/login')
      .send({
        username: "test",
        password: "test"
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
    expect(response.body.data.token).toBeDefined();
  });

  it('should reject login user if username is wrong', async () => {
    const response = await supertest(app)
      .post('/api/users/login')
      .send({
        username: "wrong username",
        password: "test"
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it('should reject login user if password is wrong', async () => {
    const response = await supertest(app)
      .post('/api/users/login')
      .send({
        username: "test",
        password: "wrong password"
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe('GET /api/users/current', () => {
  
  beforeEach(async () => {
    await UserTest.create(); 
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it('should be able to get user', async () => {
    const response = await supertest(app)
      .get('/api/users/current')
      .set('X-API-TOKEN', 'test');

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });

  it('should reject get user if token is invalid', async () => {
    const response = await supertest(app)
      .get('/api/users/current')
      .set('X-API-TOKEN', 'wrong-token');

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

});

describe('PATCH /api/users/current', () => {

  beforeEach(async () => {
    await UserTest.create(); 
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it('should reject update user if request is invalid', async () => {
    const response = await supertest(app)
      .patch('/api/users/current')
      .set('X-API-TOKEN', 'test')
      .send({
        username: "",
        password: "",
        name: ""
      });
    
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should reject update user if token is wrong', async () => {
    const response = await supertest(app)
      .patch('/api/users/current')
      .set('X-API-TOKEN', 'wrong-token')
      .send({
        username: "new_test",
        password: "new_test",
        name: "new_test"
      });
    
    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it('should reject update user if username is already exists', async () => {
    const response = await supertest(app)
      .patch('/api/users/current')
      .set('X-API-TOKEN', 'test')
      .send({
        username: "test_2",
      });
    
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it ('should be able to update name', async () => {
    const response = await supertest(app)
      .patch('/api/users/current')
      .set('X-API-TOKEN', 'test')
      .send({
        name: "new_test",
      }); 

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("new_test");
  });

  it ('should be able to update username', async () => {
    const response = await supertest(app)
      .patch('/api/users/current')
      .set('X-API-TOKEN', 'test')
      .send({
        username: "new_test",
      }); 

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("new_test");
  });

  it ('should be able to update password', async () => {
    const response = await supertest(app)
      .patch('/api/users/current')
      .set('X-API-TOKEN', 'test')
      .send({
        password: "new_test",
      });
    
      logger.debug(response.body);
      expect(response.status).toBe(200);

      const user = await UserTest.get();
      expect(await bcrypt.compare("new_test", user.password)).toBe(true);
  });

});
