import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../app.js';
import User from '../models/user.js';

describe('Auth Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user', async () => {
    const mockUser = {
      _id: '123',
      name: 'Test User',
      email: 'test@example.com',
      role: 'customer',
    };

    jest.spyOn(User, 'findOne').mockResolvedValue(null);
    jest.spyOn(User, 'create').mockResolvedValue(mockUser);

    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'customer',
    });

    if (res.statusCode === 500) {
      console.log('500 Error:', res.body);
    }
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.email).toEqual('test@example.com');
  });
});
