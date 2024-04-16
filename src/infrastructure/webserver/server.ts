import { join } from 'path'
import autoLoad from '@fastify/autoload'
import fastify, { FastifyInstance } from 'fastify'
import Morgan from 'morgan'
import { IRoute } from '../../domain/interfaces/routeInterface'
import { registerSchemas } from '../../domain/validation'
import config from '../config/config'
import { registerDependencies } from '../config/dependencyInjection'
import { ENVIRONMENTS, envToLogger } from '../config/logger'

import GenericPlugin from "../plugins/00-genericPlugin";
import SwagggerPlugin from "../plugins/01-swagggerPlugin";
import ReateLimitPlugin from "../plugins/02-reateLimitPlugin";
import DiPlugin from "../plugins/03-diPlugin";
import JwtPlugin from "../plugins/04-jwtPlugin";
import SquelizePlugin from "../plugins/05-squelizePlugin";
import { DatabaseAdapter } from '../../application/adapters/databaseAdapter'
import { AppSingleton } from './appSingleton'

Morgan.token('remote-addr', (req, _res) => {
  return req.headers['x-forwarded-for'] ? (req.headers['x-forwarded-for'] as string) : req.socket.remoteAddress
})

class AppServer {
  private instance: FastifyInstance
  public app_domain: string = config.api.domainName
  public app_port: number = config.api.port

  constructor() {
    this.instance = fastify({ logger: envToLogger[config.api.logger as ENVIRONMENTS] })
  }

  async build(appConfig: { routes: IRoute[] }): Promise<FastifyInstance> {
    registerDependencies()
    registerSchemas(this.instance)

    // this.instance.register(autoLoad, { dir: join(__dirname, '../', 'plugins') })

    // await this.instance.register(SquelizePlugin)

    await Promise.all([
      this.instance.register(GenericPlugin),
      this.instance.register(SwagggerPlugin),
      this.instance.register(ReateLimitPlugin),
      this.instance.register(DiPlugin),
      this.instance.register(JwtPlugin),
    ])

    await Promise.all(appConfig.routes.map((route) => this.instance.register(route.routes, { prefix: route.prefixRoute })))

    // Init database
    const databaseAdapter = new DatabaseAdapter()
    await databaseAdapter.connect()
    AppSingleton.setInstance(this.instance, true)
    return this.instance
  }
}

export default AppServer
