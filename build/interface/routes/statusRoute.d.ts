import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { IRoute } from '../../domain/interfaces/routeInterface';
declare class StatusRoute implements IRoute {
    prefixRoute: string;
    routes(fastify: FastifyInstance, _options: FastifyPluginOptions, _done: any): Promise<void>;
}
export default StatusRoute;
