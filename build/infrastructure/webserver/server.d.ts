import { FastifyInstance } from 'fastify';
import { IRoute } from '../../domain/interfaces/routeInterface';
declare class App {
    instance: FastifyInstance;
    app_domain: string;
    app_port: number;
    constructor(appConfig: {
        routes: IRoute[];
    });
    listen(): void;
}
export default App;
