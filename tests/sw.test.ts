import axios from 'axios';
import supertest from 'supertest';

import createServer from '@/utils/server';
import { dummyCharacter, dummyUser } from './testsData';
import { generateJWT } from '@/auth/jwtStrategy';
import { User } from '@/models';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const app = createServer();

describe('Get all and filtered SW characters', () => {
  test('Get all characters', async () => {
    await mockedAxios.get.mockResolvedValueOnce({ data: [{ ...dummyCharacter }] });
    await supertest(app).get('/api/v1/starwars/getall').expect(200);
  });
  test('Get all check if incorrect data', async () => {
    await mockedAxios.get.mockResolvedValueOnce({});
    await supertest(app).get('/api/v1/starwars/getall').expect(400);
  });

  test('Send error if user is not logged in', async () => {
    await mockedAxios.get.mockResolvedValueOnce({ data: [{ ...dummyCharacter }] });
    await supertest(app).get('/api/v1/starwars/getfiltered').expect(401);
  });

  test('Send error if no filters provided', async () => {
    const userToken = generateJWT(dummyUser.email, dummyUser.id);
    User.findOne = jest.fn().mockImplementation(() => Promise.resolve(User));
    await mockedAxios.get.mockResolvedValueOnce({ ...dummyCharacter });
    await supertest(app)
      .get('/api/v1/starwars/getfiltered/')
      .set('Authorization', 'Bearer ' + userToken)
      .expect(400);
  });
});
