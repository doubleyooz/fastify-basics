export const email = {
    type: 'string',
    pattern:
        "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
};

export const password = {
    type: 'string',
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$",
    //pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
};

export const name = {
    type: 'string',
    minLength: 3,
    maxLength: 15,
};

export const Authorization = {
    type: 'string',
    minLength: 10,
    description: 'Bearer token of the user.',
};
