'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Fazenda extends Model {

  produtor = () => this.belongsTo('App/Models/Produtor')

}

module.exports = Fazenda
