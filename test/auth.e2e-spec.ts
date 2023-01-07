import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setupApp } from '../src/setupApp';

describe('Auth Service (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  it('handles a signup request', () => {
    const user = {
      email: 'user@test.com',
      password: 'password',
    };
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(user)
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(user.email);
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const user = {
      email: 'user@test.com',
      password: 'password',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(user)
      .expect(201);

    const cookie = response.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/current-user')
      .set('Cookie', cookie)
      .expect(200);
  });
});
