import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { IRoute } from '../../domain/interfaces/routeInterface';
declare class AuthRoute implements IRoute {
    prefixRoute: string;
    routes(fastify: FastifyInstance, _options: FastifyPluginOptions, _done: any): Promise<void>;
}
export default AuthRoute;
