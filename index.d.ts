declare module 'playnix-core/device.informer' {
  export default class DeviceInformer {
      init(): void;
      /**
       * @description Get the device OS
       * @returns {{name:String,version:String}}
       */
      getOS(): {
          name: string;
          version: string;
      };
      /**
      * @description Get device model details
      * @returns {{vendor:String,model:String}}
      */
      getDevice(): {
          vendor: string;
          model: string;
      };
      /**
      * @description Get runtine engine - for browser only
      * @returns {{name:String,version:String}}
      */
      getEngine(): {
          name: string;
          version: string;
      };
  }

}
declare module 'playnix-core/index' {
  export { default as LogClient } from "playnix-core/log.client";
  export { default as DeviceInformer } from "playnix-core/device.informer";
  export { default as PlaynixBaseClient } from "playnix-core/playnix.base";

}
declare module 'playnix-core/log.client' {
  export default class LogClient {
      /**
       * @protected
       * @param {Message} message
       */
      protected _populateMessage(message: any): any;
      /**
       * @protected
       * @param {Error} error
       */
      protected _createException(error: Error): any;
      /**
      * @public
      * @description Initializes playnix's logging client.
      * @param {String} key
      * @param {PlaynixOptions} options
      */
      public init(options: any): void;
      _xhttp: XMLHttpRequest;
      /**
       * @protected
       * @param {import('playnix-core/device.informer').default} informer
       */
      protected registerDeviceInformer(informer: import('playnix-core/device.informer').default): void;
      deviceInformer: import("playnix-core/device.informer").default;
      /**
       * @public
       * @param {String} username
       */
      public setAppUser(username: string): void;
      _user: string;
      /**
       * @public
       * @param {String} version App version info
       */
      public setAppVersion(version: string): void;
      _user_version: string;
      /**
       * @public
       * @param {Object|Array} data
       */
      public setMetaContext(data: any | any[]): void;
      _meta: any;
      /**
      * @public
      * @param {String} message the custom message to log
      * @param {Object} data additional data to send(must contains values of string, number, or boolean)
      */
      public writeMessage(message: string): void;
      /**
      * @public
      * @param {String} id event id
      * @param {String} message event message
      * @param {String} category event action
      */
      public writeEvent(message: string, id: string, category: string): void;
      /**
      * @public
      * @param {Error} error Error object to log.
      * @param {Object} data additional data to send(must contains values of string, number, or boolean)
      */
      public writeException(error: Error, data: any): void;
  }

}
declare module 'playnix-core/playnix.base' {
  export default class PlaynixBaseClient {
      /**
       * @private
       * @type {String}
       */
      private token;
      /**
       * @private
       * @type {PlaynixOptions}
       */
      private options;
      /**
       * @public
       */
      public get isAuthenticated(): boolean;
      /**
      * @public
      * @description Initializes the playnix session.
      * @param {PlaynixOptions} options
      */
      public init(options: any): void;
      /**
       * @protected
       * @param {PlaynixOptions} options
       */
      protected _setup(options: any): void;
      /**
       * @public
       * @description Verifies the user social login access token
       * @param {String} sid Social prodiver user Id
       * @param {String} provider Social provider ie {Goole, Facebook}
       * @param {String} token Access token generated from social login
       */
      public authenticate(sid: string, provider: string, token: string): void;
      /**
       * @public
       * @description Saves player data
       * @param {Object} data
       */
      public saveGameData(data: any): void;
      /**
       * @public
       * @description Loads player save data
       */
      public loadGameData(): void;
      /**
       * @public
       * @description Checks player login status
       * @returns {Object} player ref
       */
      public getLoginStatus(): any;
  }

}
declare module 'playnix-core/utils' {
  class Utils {
      static stringify(value: any): string;
      static isLogLevel(value: any): boolean;
      static isObject(what: any): boolean;
      static isError(value: any): boolean;
      static isNull(value: any): boolean;
      /**
       * @param {String} value
       */
      static isNullOrEmpty(value: string): boolean;
  }
  namespace Utils {
      const PRIMITIVES: string[];
  }
  export default Utils;

}
declare module 'playnix-core' {
  import main = require('playnix-core/index');
  export = main;
}