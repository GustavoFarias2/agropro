'use strict'

class StoreUser {

  get rules() {

    return {
      nome: 'required',
      email: 'email|required',
      password: 'required|confirmed'
    }

  }

}

module.exports = StoreUser
