const { test, trait } = use('Test/Suite')('0_Authenticate')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

trait('Test/ApiClient')

test('should start the session and return a token', async ({ client, assert }) => {

  const userData = {
    email: 'auth@test.com',
    password: 'password'
  }

  const user = await Factory
    .model('App/Models/User')
    .create(userData)

  const response = await client
    .post('/auth')
    .send(userData)
    .end()

  response.assertStatus(200)

  assert.exists(response.body.token)

})

test('should create an account (user store route)', async ({ client }) => {

  const response = await client
    .post('/user')
    .send({
      nome: 'Nome Teste',
      email: 'user@test.com',
      password: '123qwe',
      password_confirmation: '123qwe',
    })
    .end()

  response.assertStatus(200)

})
