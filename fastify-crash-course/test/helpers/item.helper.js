import supertest from 'supertest';
import { app } from '../../src/config/fastify.config';
import { item1 } from '../mocks/item.mock.js';

const itif = condition => (condition ? it : it.skip());

const createItem = (payload, token, statusCode) => {
    describe('it tries to create an item', () => {
        it('POST /items', async () => {
            await app.ready();

            await supertest(app.server)
                .post('/items')
                .send(payload)
                .then(response => {
                    console.log(response.body);
                    expect(
                        typeof response.body === 'object' &&
                            !Array.isArray(response.body) &&
                            response.body !== null,
                    ).toBeTruthy();

                    switch (statusCode) {
                        case 201:
                            expect(response.status).toEqual(201);
                            expect(response.body.data).toBeDefined();
                            payload._id = response.body.data._id;

                            expect(response.body).toMatchObject({
                                data: payload,
                            });

                            break;

                        case 400:
                            expect(response.status).toEqual(400);
                            expect(response.body).toMatchObject({
                                data: null,
                            });
                            break;

                        case 401:
                            expect(response.status).toEqual(401);
                            break;

                        default:
                            expect(2).toBe(3);
                            break;
                    }
                });
        });
    });
};

export { createItem };
