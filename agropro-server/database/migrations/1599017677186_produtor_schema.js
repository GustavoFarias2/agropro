'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutorSchema extends Schema {
  up () {
    this.create('produtors', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('cpf_cnpj', 14).notNullable()
      table.string('nome', 80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('produtors')
  }
}

module.exports = ProdutorSchema
