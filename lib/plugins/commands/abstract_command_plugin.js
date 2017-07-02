"use strict";

/**
 * Base Command Plugin class
 */
class AbstractCommandPlugin {
  /**
   * Default constructor. This is the only one that the core wil@l load.
   * @param {object} options Raw object from config.js : config.plugins.commands.plugins.<name>
   */
  constructor(options) {
    /**
     * Users allowed to use this bot.
     * Format is "backend:nickname".
     * If equals to "*", everybody on every backend will be able to use it.
     *
     * There is no way to add a wildcard only for a backend as of now.
     *
     * @type {string[]}
     */
    this.allowedUsers = [];

    //TODO: Add support for "<backend>:*"

    if (options.allowed_users instanceof Array) {
      for (let allowedUser of options.allowed_users) {
        if (typeof allowedUser !== "string") {
          continue;
        }
        this.allowedUsers.push(allowedUser);
      }
    }
  }

  // region Base methods, shouldn't be overriden

  /**
   * Is a user allowed to use this command plugin?
   * @param {string} backend Backend this message is coming from
   * @param {string} nickname User's nickname
   * @returns {boolean} Whether the user can use this or not
   */
  isUserAllowed(backend, nickname) {
    // Transform our arguments to the "allowed_users" format
    let fullUser = (backend + ":" + nickname).toLowerCase();

    for (let allowedUser of this.allowedUsers) {
      if ("*" === allowedUser || fullUser === allowedUser.toLowerCase()) {
        return true;
      }
    }

    return false;
  }

  // endregion

  // region Methods that you actually need to override

  /**
   * Command plugin name
   * @type {string}
   */
  get name() {
    throw new Error(
      "AbstractCommandPlugin - 'get name' not implemented or called the base implementation"
    );
  }

  /**
   * Command alias (for example 't' for 'twitter').
   * @type {string}
   */
  get alias() {
    throw new Error(
      "AbstractCommandPlugin - 'get alias' not implemented or called the base implementation"
    );
  }

  /**
   * Called when a command has been detected and access control checked.
   * You only need to execute the command and write back to the output.
   * The "<prefix><command|alias>" part has been stripped. Only the argument string remains.
   * @param {AbstractBackend} backend Backed the command is originating from.
   * @param {string} args The arguments string. Should be space-separated.
   */
  onCommand(backend, args) {
    throw new Error(
      "AbstractCommandPlugin - 'onCommand' not implemented or called the base implementation"
    );
  }

  // endregion
}

module.exports = AbstractCommandPlugin;
