'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with users
 */
class UserController {

  /**
   * Show a list of all produtors.
   * GET produtors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
 */
  async index({ auth }) {

    const user = await User
      .query()
      .where('id', auth.user.id)
      .with('produtores')
      .first()

    return user

  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store({ request }) {

    const { nome, email, password } = request.only([
      'nome',
      'email',
      'password'
    ])

    const user = await User.create({ nome, email, password })

    return user

  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async show({ params }) {

    const user = await User.findOrFail(params.id)

    return user

  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ auth, params, response, request }) {

    if (auth.user.id == params.id) {

      const user = await User.findOrFail(auth.user.id)

      await user.merge(request.only([
        'nome'
      ]))

      await user.save()

      return user

    }
    else
      response.status(401).send()

  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ auth, params, response }) {

    if (auth.user.id == params.id) {

      const user = await User.findOrFail(auth.user.id)

      await user.delete()

    }
    else
      response.status(401).send()

  }

}

module.exports = UserController
