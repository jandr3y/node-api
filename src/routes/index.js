import UserRoutes from './user.routes'
import AuthRoutes from './auth.routes'

const routes = (server) => {
    AuthRoutes(server)
    UserRoutes(server)
}

export default routes;