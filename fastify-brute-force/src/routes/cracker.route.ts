import crackerController from "../controllers/cracker.controller";
import crackerSchema from "../schemas/cracker.schema";

const app = (fastify: any, options: any, done: any) => {
    fastify.post(`/password`, {
        schema: crackerSchema.crackPassword,
        handler: crackerController.crack,
    });
    done();
};

export default app