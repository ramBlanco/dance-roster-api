import { FastifyReply, FastifyRequest } from 'fastify';
declare class IndexController {
    static index(_request: FastifyRequest, reply: FastifyReply): Promise<never>;
}
export default IndexController;
