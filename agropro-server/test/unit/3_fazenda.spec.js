const { test, trait } = use('Test/Suite')('3_Fazenda')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Fazenda = use('App/Models/Fazenda')

trait('Test/ApiClient')
trait('Auth/Client')

test('should create a fazenda (fazenda store route)', async ({ client }) => {

  const user = await User.find(1)

  const fazenda = {
    produtor_id: 2,
    nome: "fazenda",
    area: 200,
    area_consolidada: 100,
    area_legal: 100
  }

  const response = await client
    .post('/fazenda')
    .loginVia(user)
    .send(fazenda)
    .end()

  response.assertStatus(200)

})

test('should get a fazenda (fazenda show route)', async ({ client }) => {

  const user = await User.find(1)

  const response = await client
    .get('/fazenda/' + 1)
    .loginVia(user)
    .end()

  response.assertStatus(200)

})

test('should update a fazenda (fazenda update route)', async ({ client, assert }) => {

  const user = await User.find(1)

  const responseUpdate = await client
    .put('/fazenda/' + 1)
    .send({
      nome: 'fazenda novo nome'
    })
    .loginVia(user)
    .end()

  responseUpdate.assertStatus(200)

  const responseCheckUpdate = await client
    .get('/fazenda/' + responseUpdate.body.id)
    .loginVia(user)
    .end()

  responseCheckUpdate.assertStatus(200)

  assert.equal(responseCheckUpdate.body.nome, 'fazenda novo nome')

})

test('check if fazenda was deleted (fazenda delete route)', async ({ client, assert }) => {

  const user = await User.find(1)

  const response = await client
    .delete('/fazenda/' + 1)
    .loginVia(user)
    .end()

  response.assertStatus(204)

  const fazendaCheckDeleted = await Fazenda.find(1)

  assert.notExists(fazendaCheckDeleted)

})

