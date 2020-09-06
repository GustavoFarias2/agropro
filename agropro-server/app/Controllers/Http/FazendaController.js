'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Produtor = use('App/Models/Produtor')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Fazenda = use('App/Models/Fazenda')

/**
 * Resourceful controller for interacting with fazendas
 */
class FazendaController {

  /**
   * Show a list of all fazendas.
   * GET fazendas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response, auth }) {

    const { id } = request.only('id')

    const produtor = await Produtor.findOrFail(id)

    if (produtor.user_id !== auth.user.id)
      return response.status(401).send()

    const fazendas = await Produtor
      .query()
      .where('id', id)
      .with('fazendas')
      .fetch()

    return fazendas

  }

  /**
   * Create/save a new fazenda.
   * POST fazendas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {

    const newFazenda = request.only([
      'produtor_id',
      'nome',
      'cidade',
      'estado',
      'culturas',
      'area',
      'area_consolidada',
      'area_legal'
    ])

    if (newFazenda.area_consolidada + newFazenda.area_legal > newFazenda.area)
      return response.status(400).send()

    const checkIfExist = await Fazenda
      .query()
      .where('nome', newFazenda.nome)
      .where('produtor_id', newFazenda.produtor_id)
      .first()

    if (checkIfExist)
      return response.status(303).send()

    const fazenda = await Fazenda.create(newFazenda)

    return fazenda

  }

  /**
   * Display a single fazenda.
   * GET fazendas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, response, auth }) {

    const fazenda = await Fazenda
      .query()
      .where('id', params.id)
      .with('produtor')
      .first()

    const produtor = await fazenda
      .produtor()
      .fetch()

    if (produtor.user_id !== auth.user.id)
      return response.status(401).send()

    return fazenda

  }

  /**
   * Update fazenda details.
   * PUT or PATCH fazendas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {

    const fazenda = await Fazenda
      .query()
      .where('id', params.id)
      .with('produtor')
      .first()

    const produtor = await fazenda
      .produtor()
      .fetch()

    if (produtor.user_id !== auth.user.id)
      return response.status(401).send()

    const newFazenda = request.only([
      'nome',
      'cidade',
      'estado',
      'culturas',
      'area',
      'area_consolidada',
      'area_legal'
    ])

    if (newFazenda.area_consolidada + newFazenda.area_legal > newFazenda.area)
      return response.status(400).send()

    await fazenda.merge(newFazenda)

    await fazenda.save()

    return fazenda

  }

  /**
   * Delete a fazenda with id.
   * DELETE fazendas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response, auth }) {

    const fazenda = await Fazenda
      .query()
      .where('id', params.id)
      .with('produtor')
      .first()

    const produtor = await fazenda
      .produtor()
      .fetch()

    if (produtor.user_id !== auth.user.id)
      return response.status(401).send()

    await fazenda.delete()


  }

}

module.exports = FazendaController
