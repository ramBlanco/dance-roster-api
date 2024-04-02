import { app } from "./server";

export default async (req, res) => {
  await app.instance.ready()
  app.instance.server.emit("request", req, res)
}