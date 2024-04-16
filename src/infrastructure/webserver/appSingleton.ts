import { FastifyInstance } from "fastify";

export class AppSingleton {

  private static instance: FastifyInstance;

  public static setInstance(app: FastifyInstance, force: boolean = false): FastifyInstance {
    if (!AppSingleton.instance || force) {
      AppSingleton.instance = app;
    }

    return AppSingleton.instance;
  }

  public static getInstance(): FastifyInstance {
    return AppSingleton.instance
  }
}