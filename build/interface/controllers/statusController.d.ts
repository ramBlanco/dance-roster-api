import { FastifyReply, FastifyRequest } from 'fastify';
declare class StatusController {
    static checkStatus(_request: FastifyRequest, reply: FastifyReply): Promise<never>;
}
export default StatusController;
