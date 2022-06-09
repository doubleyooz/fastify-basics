import crackerController from "../controllers/cracker.controller";

const app = (fastify: any, options: any, done: any) => {
    fastify.get(`/crack`, {
        
        handler: crackerController.crack,
    });
    done();
};

export default app