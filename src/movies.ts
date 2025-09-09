import ServerFactory from './api/infrastructure/adapter/api/factory/ServerFactory'
import MovieRouterFactory from './movie/infrastructure/adapter/api/factory/MovieRouterFactory'
import ParkingRouterFactory from './parking/infrastructure/adapter/api/factory/ParkingRouterFactory'
import AccountingRouterFactory from './accounting/infrastructure/adapter/api/factory/AccountingRouterFactory'

const movieRouter = MovieRouterFactory.create()    // instancia AbstractMovieRouter
const { router: accountingRouter, service: accountingService } = AccountingRouterFactory.create()
const parkingRouter = ParkingRouterFactory.create(accountingService) // instancia AbstractParkingRouter

const server = ServerFactory.create([movieRouter, parkingRouter, accountingRouter])

server.start()

