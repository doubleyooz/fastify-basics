const body = (props: any) => {
    return {
        type: 'object',
        additionalProperties: false,
        properties: {
            ...props,
        },
        required: [...Object.keys(props)],
    };
};

const props = {
    email: {
        type: 'string',
        pattern:
            "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
    },
    password: {
        type: 'string',
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    },
    name: {
        type: 'string',
        min: 3,
        max: 15,
    },
};

const store = {
    summary: 'creates a new user and store it',
    consumes: ['application/json'],
    body: body(props),
    response: {
        200: {
            type: 'object',
            properties: {
                data: { type: 'string' },
            },
        },
    },
};

export default { store };
