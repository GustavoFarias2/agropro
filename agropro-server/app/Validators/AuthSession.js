'use strict'

class AuthSession {

  get rules () {

    return {
      email: 'email|required',
      password: 'required'
    }

  }
  
}

module.exports = AuthSession
