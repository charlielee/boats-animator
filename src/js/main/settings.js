(function () {
  const Store = require('electron-store');
  // const appVersion =  require('../../package').version;

  /**
   * Managing app global settings
   */
  class Settings {
    constructor() {
      this.store = new Store({
        name: 'settings',
        schema: {
          // App windows
          'windows': {
            type: 'object',
            properties: {
              // Animator window
              'animator': {
                type: 'object',
                properties: {
                  // Last maximize status of the window
                  'isMaximized': {
                    type: 'boolean',
                    default: false
                  },
                  // Last dimensions of the window
                  'winBounds': {
                    type: 'object',
                    properties: {
                      'x': {
                        type: 'number'
                      },
                      'y': {
                        type: 'number'
                      },
                      'width': {
                        type: 'number'
                      },
                      'height': {
                        type: 'number'
                      }
                    }
                  }
                }
              }
            }
          }
        }
        // },
        // migrations: {
        //   '0.10.0': store => {
        //     store.set('version', appVersion);
        //   }
        // }
      });
    }

    /**
     * Returns a single setting
     * @param {String} key The name of the setting to return
     */
    get(key) {
      return this.store.get(key);
    }

    /**
     * Updates a single setting
     * @param {String} key The name of the setting to update
     * @param {String} value The value to update the setting to
     */
    set(key, value) {
      this.store.set(key, value);
    }
  }

  module.exports = Settings;
})();