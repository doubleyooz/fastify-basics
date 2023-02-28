import {
    email,
    emailOrId,
    name,
    password,
    picture,
    schema,
    user,
} from '../utils/schema.util';

const looseSchema = (
    props: Record<string, any>,
    requiredProperties?: {
        required: string[];
    }[],
) => {
    return {
        type: 'object',
        additionalProperties: false,
        properties: {
            ...props,
        },
        anyOf: requiredProperties,
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
    params: schema({ _id: emailOrId }),
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: user,
                },
                message: { type: 'string' },
            },
        },
    },
};

const find = {
    summary: 'returns users from the database',
    consumes: ['application/json'],

    querystring: looseSchema({ name: name }),
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: user,
                        required: ['name', 'email', 'picture'],
                    },
                },
            },
        },
    },
};

const update = {
    summary: 'update an existing user',
    consumes: ['application/json'],
    body: looseSchema({ name, picture }, [
        { required: ['name'] },
        { required: ['picture'] },
    ]),
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

export default { store, find, findOne, update };
