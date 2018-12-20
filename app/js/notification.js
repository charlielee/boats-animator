module.exports = {};

(function() {
  "use strict";
  let notifyId    = 0,
      qNotifyArea = document.querySelector("#notification-container");

  /**
   * @private
   * Generate a notification ID.
   * @returns {Number} The ID number.
   */
  function _id() {
    notifyId++;
    return notifyId;
  }

  /**
   * Create the HTML for a notification.
   * @see _make()
   *
   * @param {Object} notify - A notification object.
   * @returns {String} The compiled notification HTML.
   */
  function _compile(notify) {
    return `<div class="notification ${notify._class}" id="notification-${notify.id}">
      <div class="notify-type">${notify.type}</div>
      <div class="msg">${notify.msg}</div>
    </div>`;
  }

  /**
   * Create a notification object.
   *
   * @param {String} type - The type of notification we want to display.
   * @param {String|Number} [msg=""] - The notification message.
   * @returns {Object} A generated notification object.
   */
  function _make(type, msg) {
    type = type.toLowerCase();
    let details = {
      id: _id(),
      _class: type,
      type: type,
      msg: msg || "",
    };

    details.html = _compile(details);
    return details;
  }

  /**
   * Show a notification.
   * @see _make
   *
   * @param {Object} notify - A notification object.
   * @returns {Object} The notification object given.
   */
  function _show(notify) {
    qNotifyArea.insertAdjacentHTML("afterbegin", notify.html);

    // Wait a very short bit before making the notification visible
    // Without this timeout, the sliding animation does not play
    setTimeout(() => {
      document.querySelector(`#notification-${notify.id}`).classList.add("visible");
    }, 15)

    return notify;
  }

  /**
   * Hide a notification after a set time.
   * @see _make
   *
   * @param {Object} notify - A notification object.
   * @returns {Object} The notification object given.
   */
  function _hideDelayed(notify) {
    // Time in seconds before the notification should go away
    let timeout = 3.5;

    // Remove the notification
    window.setTimeout(function() {
      let thisNotify = document.querySelector(`#notification-${notify.id}`);
      thisNotify.classList.add("hiding");

      // Perform a fade out transition before removing the notification
      thisNotify.addEventListener("transitionend", function(e) {
        if (e.propertyName === "opacity") {
          e.target.remove();
        }
      });
    }, 1000 * timeout);
  }

  /**
   * Display an information notification.
   *
   * @param {String|Number} [msg=""] - The message to display.
   * @returns {void}
   */
  function info(msg="") {
    console.info(`Info: ${msg}`);
    _hideDelayed(_show(_make("info", msg)));
  }

  /**
   * Display an error notification.
   *
   * @param {String|Number} [msg=""] - The message to display.
   * @returns {void}
   */
  function error(msg="") {
    console.error(`Error: ${msg}`);
    _hideDelayed(_show(_make("error", msg)));
  }

  /**
   * Display a success notification.
   *
   * @param {String|Number} [msg=""] - The message to display.
   * @returns {void}
   */
  function success(msg="") {
    console.log(`Success: ${msg}`);
    _hideDelayed(_show(_make("success", msg)));
  }


  // Public exports
  module.exports.info    = info;
  module.exports.error   = error;
  module.exports.success = success;
}());
