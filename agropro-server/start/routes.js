'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('auth', 'AuthController.store').validator('AuthSession')

Route.post('/user', 'UserController.store').validator('StoreUser')

Route.group(() => {

  Route.resource('/user', 'UserController').apiOnly().except('store')
  Route.resource('/produtor', 'ProdutorController').apiOnly()
  Route.resource('/fazenda', 'FazendaController').apiOnly()

}).middleware('auth')
