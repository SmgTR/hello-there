import dotenv from 'dotenv';

import { User } from '@/models';

import { dummyUser } from './tests/testsData';

dotenv.config({ path: '.env.test' });

jest.mock('bcrypt');

jest.mock('@/models/user', () => ({
  findAll: jest.fn().mockImplementation(() => Promise.resolve(User)),
  findByPk: jest.fn().mockImplementation(() => Promise.resolve(User)),
  create: jest.fn().mockImplementation(() => {
    return dummyUser;
  }),
  destroy: jest.fn(),
  save: jest.fn().mockImplementation(() => {
    Promise.resolve(User);
  })
}));
