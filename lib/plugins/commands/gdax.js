// @ts-check
"use strict";

const AbstractCommandPlugin = require("./abstract_command_plugin");
const MessagesHandler = require("../../messages_handler");
const { RichMessage, RichMessageField } = require("../../rich_message");
const https = require("../../util/async_https");
const logger = require("winston");

async function fetchGdaxTicker(coin, fiat) {
  try {
    logger.debug("[Gdax] Fetching " + coin + " " + fiat);
    const res = await https.get(
      "api.gdax.com",
      `/products/${coin}-${fiat}/ticker`
    );
    const price = Number.parseFloat(res.price);
    if (!isNaN(price)) {
      return price.toString();
    }
    throw new Error("Price was not a number");
  } catch (e) {
    return "Error";
  }
}

class Coin {
  constructor(name) {
    /** @type {string} */
    this.name = name;
    /** @type {string} */
    this.usdValue = "";
    /** @type {string} */
    this.eurValue = "";
  }

  fetch() {
    return Promise.all([this.fetchUsd(), this.fetchEur()]).then(res => {
      return this;
    });
  }

  fetchUsd() {
    return fetchGdaxTicker(this.name, "USD").then(res => {
      this.usdValue = res;
    });
  }

  fetchEur() {
    return fetchGdaxTicker(this.name, "EUR").then(res => {
      this.eurValue = res;
    });
  }

  toRichMessageField() {
    return new RichMessageField(
      this.name.toUpperCase(),
      `$ ${this.usdValue}\n€ ${this.eurValue}`,
      true
    );
  }

  toBasicString() {
    return `${this.name.toUpperCase()}: $ ${this.usdValue} - ${
      this.eurValue
    } €`;
  }
}

/**
 * Gdax digest
 * Sweet cryptos
 */
class Gdax extends AbstractCommandPlugin {
  constructor(options) {
    super(options);
  }

  get name() {
    return "gdax";
  }

  get alias() {
    return "g";
  }

  onCommand(backend, args) {
    logger.debug("[Gdax] Fetching");
    // Ask all coins to return their values
    // Coin.fetch returns the coin instance, with filled values
    Promise.all([
      new Coin("BTC").fetch(),
      new Coin("ETH").fetch(),
      new Coin("LTC").fetch()
    ])
      .then(res => {
        logger.debug("[Gdax] Got them");
        const message = new RichMessage(null);

        message.basicText = res.reduce((acc, coin, i) => {
          return acc + "\n" + coin.toBasicString();
        }, "GDAX Tickers:");

        message.addEmbed = true;
        message.content = null;
        message.color = "2d6ccd";
        message.footer = "GDAX Tickers";
        message.fields = res.map(c => {
          return c.toRichMessageField();
        });

        MessagesHandler.sendMessageExcluding([], message);
      })
      .catch(e => {
        MessagesHandler.sendMessageExcluding(
          [],
          "Error while fetching GDAX tickers: " + e
        );
      });
  }
}

module.exports = Gdax;
