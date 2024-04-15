import awsLambdaFastify from "@fastify/aws-lambda";
import { buildApp } from "./app";
import { APIGatewayEvent, Context } from "aws-lambda";

export async function handler(event: APIGatewayEvent, context: Context) {
  const app = await buildApp()
  const proxy = awsLambdaFastify(app, { decorateRequest: false })
  return await proxy(event, context)
}