'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {

  static boot() {

    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

  }

  static get hidden() {
    return ['password', 'created_at', 'updated_at']
  }

  tokens = () => this.hasMany('App/Models/Token')

  produtores = () => this.hasMany('App/Models/Produtor')

}

module.exports = User
