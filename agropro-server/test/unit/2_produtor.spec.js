const { test, trait, after } = use('Test/Suite')('2_Produtor')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Produtor = use('App/Models/Produtor')

trait('Test/ApiClient')
trait('Auth/Client')

test('should create a produtor (produtor store route)', async ({ client, assert }) => {

  const user = await User.find(1)

  const produtor = {
    cpf_cnpj: 12312312312,
    nome: "Nome Produtor"
  }

  const response = await client
    .post('/produtor')
    .loginVia(user)
    .send(produtor)
    .end()

  response.assertStatus(200)

})

test('should get a produtor (produtor show route)', async ({ client }) => {

  const user = await User.find(1)

  const response = await client
    .get('/produtor/' + 1)
    .loginVia(user)
    .end()

  response.assertStatus(200)

})

test('should update a produtor (produtor update route)', async ({ client, assert }) => {

  const user = await User.find(1)

  const responseUpdate = await client
    .put('/produtor/' + 1)
    .send({
      nome: 'Produtor novo Nome'
    })
    .loginVia(user)
    .end()

  responseUpdate.assertStatus(200)

  const responseCheckUpdate = await client
    .get('/produtor/' + 1)
    .loginVia(user)
    .end()

  responseCheckUpdate.assertStatus(200)

  assert.equal(responseCheckUpdate.body.nome, 'Produtor novo Nome')

})

test('check if produtor was deleted (produtor delete route)', async ({ client, assert }) => {

  const user = await User.find(1)

  const response = await client
    .delete('/produtor/' + 1)
    .loginVia(user)
    .end()

  response.assertStatus(204)

  const produtorCheckDeleted = await Produtor.find(1)

  assert.notExists(produtorCheckDeleted)

  const produtor = {
    cpf_cnpj: 123123123,
    nome: "Nome Produtor"
  }

  await client
    .post('/produtor')
    .loginVia(user)
    .send(produtor)
    .end()

})
