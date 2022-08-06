import createServer from '@/utils/server';
import supertest from 'supertest';

import { dummyUserInput } from './testsData';

import { User } from '@/models';

const app = createServer();

describe('Manage user', () => {
  User.findOne = jest.fn();
  test('Create user', async () => {
    await supertest(app).post('/api/v1/register').send(dummyUserInput).expect(201);
  });

  test('Login user', async () => {
    User.findOne = jest.fn().mockImplementation(() => Promise.resolve(User));
    await supertest(app).post('/api/v1/login').send(dummyUserInput).expect(200);
  });
});

describe('User error handlers', () => {
  test('User already exist', async () => {
    User.findOne = jest.fn().mockImplementation(() => Promise.resolve(User));
    await supertest(app).post('/api/v1/register').send(dummyUserInput).expect(409);
  });

  test('Incorrect user email', async () => {
    const response = await supertest(app)
      .post('/api/v1/register')
      .send({ ...dummyUserInput, email: 'johndoe.com' });

    expect(response.body.errors[0].msg).toBe('Email is incorrect');
    expect(response.statusCode).toBe(422);
  });

  test('Incorrect user password', async () => {
    const response = await supertest(app)
      .post('/api/v1/register')
      .send({ ...dummyUserInput, password: 'john' });

    expect(response.body.errors[0].msg).toBe(
      'The password must be 5+ chars long and contain a number'
    );
    expect(response.statusCode).toBe(422);
  });

  test('Data not provided', async () => {
    await supertest(app).post('/api/v1/register').send().expect(422);
  });
});
