import { FastifyInstance } from "fastify";
import AppServer from "./infrastructure/webserver/server";
import AuthRoute from "./interface/routes/authRoute";
import EventRoute from "./interface/routes/eventRoute";
import IndexRoute from "./interface/routes/indexRoute";
import LocationRoute from "./interface/routes/locationRoute";
import StatusRoute from "./interface/routes/statusRoute";

export async function buildApp(): Promise<FastifyInstance> {
  const appFactory = new AppServer()
  return await appFactory.build({
    routes: [
      new StatusRoute(),
      // new AuthRoute(),
      // new IndexRoute(),
      new EventRoute(),
      // new LocationRoute(),
    ],
  });
};

