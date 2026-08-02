import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../app.js';
import Cart from '../models/cart.js';
import User from '../models/user.js';

import jwt from 'jsonwebtoken';

describe('Cart Endpoints', () => {
  let token;

  beforeAll(() => {
    token = jwt.sign({ id: 'userId123' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(User, 'findById').mockReturnValue({
      select: jest.fn().mockResolvedValue({ _id: 'userId123', role: 'customer' })
    });
  });

  it('should get user cart', async () => {
    jest.spyOn(Cart, 'findOne').mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        user: 'userId123',
        items: [],
      })
    });

    const res = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  });
});
