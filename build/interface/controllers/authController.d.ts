import { FastifyReply, FastifyRequest } from 'fastify';
import { ILoginBodyRequest } from '../../domain/interfaces/requests/authRequestInterface';
declare class AuthController {
    static login(request: FastifyRequest<{
        Body: ILoginBodyRequest;
    }>, reply: FastifyReply): Promise<never>;
}
export default AuthController;
