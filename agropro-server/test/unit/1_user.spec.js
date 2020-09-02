const { test, trait } = use('Test/Suite')('1_User')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')

test('should find the created user (user index route)', async ({ client }) => {

  const user = await User.find(2)

  const response = await client
    .get('/user')
    .loginVia(user)
    .end()

  response.assertStatus(200)

})

test('should return a inserted user (user show route)', async ({ client }) => {

  const user = await User.find(2)

  const response = await client
    .get('/user/' + user.id)
    .loginVia(user)
    .end()

  response.assertStatus(200)

})


test('should update a user (user update route)', async ({ client, assert }) => {

  const user = await User.find(2)

  const responseUpdate = await client
    .put('/user/' + user.id)
    .send({
      nome: 'Nome'
    })
    .loginVia(user)
    .end()

  responseUpdate.assertStatus(200)

  const responseCheckUpdate = await client
    .get('/user/' + user.id)
    .loginVia(user)
    .end()

  responseCheckUpdate.assertStatus(200)

  assert.equal(responseCheckUpdate.body.nome, 'Nome')

})

test('check if user was deleted (user delete route)', async ({ client, assert }) => {

  const user = await User.find(2)

  const response = await client
    .delete('/user/' + user.id)
    .loginVia(user)
    .end()

  response.assertStatus(204)

  const userCheckDeleted = await User.find(2)

  assert.notExists(userCheckDeleted)

})
