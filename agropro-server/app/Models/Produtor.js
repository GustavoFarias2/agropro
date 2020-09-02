'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Produtor extends Model {

  user = () => this.belongsTo('App/Models/User')

  fazendas = () => this.hasMany('App/Models/Fazenda')

}

module.exports = Produtor
