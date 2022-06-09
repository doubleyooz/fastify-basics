export interface Request {
    min?: number;
    max: number;
    url?: string;
    username?: string;
    startsWith?: string;
}

const props = {
    min: { type: 'number', minimum: 0, maximum: 15 },
    max: { type: 'number', minimum: { $data: '1/min' }, maximum: 20 },
    url: { type: 'string' },
    username: { type: 'string' },
    startsWith: { type: 'string' },
};

const crackPassword = {
    summary: 'Crack Password via brute force',
    consumes: ['application/json'],
    body: {
        type: 'object',
        additionalProperties: false,
        properties: props,
        required: ['max'],
    },

    response: {
        200: {
            type: 'object',
            properties: {
                password: { type: 'string' },
            },
        },
    },
};

export default { crackPassword };
