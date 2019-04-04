import UserRoutes from './user.routes'
import AuthRoutes from './auth.routes'
import GroupRoutes from "./group.routes"

const routes = (server) => {
    AuthRoutes(server)
    UserRoutes(server)
    GroupRoutes(server)
}

export default routes;