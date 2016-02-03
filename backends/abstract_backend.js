"use strict";

/**
 * Abstract Backend base
 * Note: There's not really a "abstract class" concept in JS, so just consider that you shouldn't instanciate this one
 */
class AbstractBackend {

  //region Abstract methods, to be overriden

  /**
  * Default constructor. This is the only one that the core will load.
  * @param {object} options Raw object from config.js : config.backends.<name>
  */
  constructor(options) {
  }

  //noinspection JSMethodCanBeStatic
  /**
  * Connects the Backend.
  */
  connect() {
    throw new Error("'connect' not implemented or called the base implementation");
  }

  //noinspection JSMethodCanBeStatic
  /**
  * The backend name.
  * @type {string}
  */
  get name() {
    throw new Error("'get name' not implemented or called the base implementation");
    return "abstract"; // Unreachable, but linters don't like it since it should return a string.
  }

  /**
   * Send a message
   * @param {string} message Message to send
   */
  send(message) {
    throw new Error("'send' not implemented or called the base implementation");
  }

  //endregion

  //region Base methods, made for the implementation to call

  //endregion
}

module.exports = AbstractBackend;
