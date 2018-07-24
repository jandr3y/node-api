import UserRoutes from './user.routes'
import JobRoutes from './jobs.routes'
import AuthRoutes from './auth.routes'

const routes = (server) => {
    AuthRoutes(server)
    UserRoutes(server)
    JobRoutes(server)
}

export default routes;