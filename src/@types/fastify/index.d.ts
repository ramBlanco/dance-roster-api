import { IncomingMessage, Server, ServerResponse } from 'http'
import 'fastify'

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate(): void
    jwt: {
      sign(payload: string | object | Buffer, options?: Partial<fastifyJwt.SignOptions> | undefined);
    };
  }

  export interface FastifySchema {
    description: string
    tags?: string[]
  }

  interface FastifyReply {
    sendPaginationResponseData(data: unknown, total?: number): void;
  }

  export interface FastifyRequest {
    user: SignParamsWithJWT | DecodedRefreshToken;
  }
}
