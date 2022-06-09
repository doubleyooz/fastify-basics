const app = (fastify: any, options: any, done: any) => {
    fastify.get(`/`, {
        schema: {
            response: {
                200: {
                    type: 'string',
                    data: 'Hello World!',
                },
            },
        },
        handler: (req: any, reply: any) => {
            return reply.send('Hello World!');
        },
    });
    done();
};

export default app