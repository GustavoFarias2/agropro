'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FazendaSchema extends Schema {
  up () {
    this.create('fazendas', (table) => {
      table.increments()
      table.integer('produtor_id').unsigned().references('id').inTable('produtors')
      table.string('nome', 100).notNullable()
      table.string('cidade', 100).notNullable()
      table.string('estado', 20).notNullable()
      table.float('area').notNullable()
      table.float('area_consolidada').notNullable()
      table.float('area_legal').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('fazendas')
  }
}

module.exports = FazendaSchema
