import itemController from '../controllers/item.controller.js';

const itemSchema = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'string' },
        quantity: { type: 'string' },
    },
};

const create = {
    response: {
        201: {
            type: 'object',
            data: itemSchema,
        },
    },
};
const findOne = {
    response: {
        200: {
            type: 'object',
            data: itemSchema,
        },
    },
};

const findAll = {
    response: {
        200: {
            type: 'array',
            data: itemSchema,
        },
    },
};

const test = {
    response: {
        200: {
            type: 'string',
            data: 'Hello World',
        },
    },
};

const items = (fastify, options, done) => {
    fastify.post('/items', create, itemController.store);

    fastify.get('/items', findAll, itemController.findAll);

    fastify.get('/items/:id', findOne, itemController.findOne);

    fastify.get(`/`, {
        schema: test,
        handler: (req, reply) => {
            return reply.send('Hello World');
        },
    });
    done();
};

export default items;
