import App from './infrastructure/webserver/server'
import AuthRoute from './interface/routes/authRoute'
import EventRoute from './interface/routes/eventRoute'
import IndexRoute from './interface/routes/indexRoute'
import LocationRoute from './interface/routes/locationRoute'
import StatusRoute from './interface/routes/statusRoute'

export const app = new App({
  routes: [
    new StatusRoute(), 
    new AuthRoute(), 
    new IndexRoute(), 
    new EventRoute(),
    new LocationRoute(),
  ],
})

app.listen()
