import App from './infrastructure/webserver/server'
import AuthRoute from './interface/routes/authRoute'
import IndexRoute from './interface/routes/indexRoute'
import StatusRoute from './interface/routes/statusRoute'

export const app = new App({
  routes: [new StatusRoute(), new AuthRoute(), new IndexRoute()],
})

app.listen()
