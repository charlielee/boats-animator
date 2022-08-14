const nodeCrypto = require("crypto");

// Polyfill for Jest environment not supporting method used by uuid
window.crypto = {
  getRandomValues: function (buffer) {
    return nodeCrypto.randomFillSync(buffer);
  },
};
