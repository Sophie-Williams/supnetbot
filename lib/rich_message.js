class RichMessageField {
  constructor(
    /** @type {string} */ title,
    /** @type {string} */ value,
    /** @type {boolean} */ inline
  ) {
    this.title = title;
    this.value = value;
    this.inline = inline;
  }
}

class RichMessage {
  constructor(/** @type {string} */ basicText) {
    /** @type {boolean} */
    this.addEmbed = false;
    /**
     * Markdown formatted rich content
     * @type {string|null}
     */
    this.content = basicText;
    /**
     * Embed title
     * @type {string|null}
     */
    this.title = null;
    /**
     * Embed description
     * @type {string|null}
     */
    this.description = null;
    /** @type {string|null} */
    this.footer = null;
    /** @type {string|null} */
    this.color = null;
    /** @type {boolean} */
    this.preventLinkEmbed = false;
    /** @type {RichMessageField[]} */
    this.fields = null;
    /** @type {string|object|null} */
    this.author = null;
    /** @type {string|null} */
    this.thumbnail = null;

    /**
     * Fallback for outputs not supporting rich formatting
     * @type {string}
     */
    this.basicText = basicText;
  }
}

module.exports = { RichMessage, RichMessageField };
