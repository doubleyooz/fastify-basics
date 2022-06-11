const schema = (props: any) => {
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
    Authorization: {
        type: 'string',
        minLength: 10,
        description: 'Bearer token of the user.',
    },
};

const signIn = {
    summary:
        'Validate the provided email and password, it will return an access token if it passes the validation',
    consumes: ['application/json'],
    headers: schema({ Authorization: props.Authorization }),
    response: {
        200: {
            type: 'object',
            properties: {
                accessToken: { type: 'string' },
                message: { type: 'string' },
            },
        },
    },
};

export default { signIn };
