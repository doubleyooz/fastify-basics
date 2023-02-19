import { email, name, password, profile, schema } from '../utils/schema.util';

const looseSchema = (props: Record<string, any>) => {
    return {
        type: 'object',
        additionalProperties: false,
        properties: {
            ...props,
        },
        anyOf: [{ required: ['name'] }, { required: ['profile'] }],
    };
};

const store = {
    summary: 'creates a new user and store it',
    consumes: ['application/json'],
    body: schema({ email, name, password }),
    response: {
        200: {
            type: 'object',
            properties: {
                data: { type: 'string' },
                message: { type: 'string' },
            },
        },
    },
};

const findOne = {
    summary: 'returns a user from the database',
    consumes: ['application/json'],

    querystring: schema({ email: email }),
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        email: { type: 'string' },
                        profile: { type: 'string' },
                    },
                },
                message: { type: 'string' },
            },
        },
    },
};

const update = {
    summary: 'update an existing user',
    consumes: ['application/json'],
    body: looseSchema({ name, profile }),
    response: {
        200: {
            type: 'object',
            properties: {
                data: { type: 'string' },
                message: { type: 'string' },
            },
        },
    },
};

export default { store, findOne, update };
