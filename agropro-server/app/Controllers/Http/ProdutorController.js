'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Produtor = use('App/Models/Produtor')

/**
 * Resourceful controller for interacting with produtors
 */
class ProdutorController {

  /**
   * Show a list of all produtors.
   * GET produtors
   */
  async index({ auth }) {

    const produtors = await Produtor
      .query()
      .where('user_id', auth.user.id)
      .with('fazendas')
      .fetch()

    return produtors

  }

  /**
   * Create/save a new produtor.
   * POST produtors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {

    const { cpf_cnpj, nome } = request.only([
      'cpf_cnpj',
      'nome',
    ])

    const checkIfExist = await Produtor
      .query()
      .where('nome', nome)
      .where('user_id', auth.user.id)
      .first()

    if (checkIfExist)
      return response.status(303).send()

    const produtor = await Produtor.create({
      cpf_cnpj,
      nome,
      user_id: auth.user.id
    })

    const produtorWithFazendas = await Produtor
      .query()
      .where('id', produtor.id)
      .with('fazendas')
      .first()

    return produtorWithFazendas

  }

  /**
   * Display a single produtor.
   * GET produtors/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show({ params, auth, response }) {

    const produtor = await Produtor.findOrFail(params.id)

    if (produtor.user_id !== auth.user.id)
      return response.status(401).send()

    return produtor

  }

  /**
   * Update produtor details.
   * PUT or PATCH produtors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {

    const produtor = await Produtor.findOrFail(params.id)

    if (produtor.user_id !== auth.user.id)
      return response.status(401).send()

    await produtor.merge(request.only([
      'nome'
    ]))

    await produtor.save()

    return produtor

  }

  /**
   * Delete a produtor with id.
   * DELETE produtors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {

    const produtor = await Produtor.findOrFail(params.id)

    if (produtor.user_id !== auth.user.id)
      return response.status(401).send()

    await produtor.delete()

  }

}

module.exports = ProdutorController
