import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../app.js';
import Order from '../models/order.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

describe('Order Endpoints', () => {
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

  it('should get user orders', async () => {
    jest.spyOn(Order, 'find').mockReturnValue({
      sort: jest.fn().mockResolvedValue([])
    });

    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  });
});
