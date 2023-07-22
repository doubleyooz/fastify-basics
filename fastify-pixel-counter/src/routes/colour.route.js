import colourController from '../controllers/colour.controller.js';
import colourSchema from '../schemas/colour.schema.js';

const app = (fastify, options, done) => {
    fastify.post(`/colours/findOne`, {
        schema: colourSchema.findOne,
        handler: colourController.getOcurrences,
    });

    fastify.post(`/colours`, {
        schema: colourSchema.list,
        handler: colourController.list,
    });

    fastify.post(`/colours/sameColumn`, {
        schema: colourSchema.sameColumn,
        handler: colourController.sameColumn,
    });

    done();
};

export default app;
