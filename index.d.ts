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
  /// <reference types="d:/projects/playnix/client/packages/playnix-types/index" />
  export default class LogClient extends BaseLogClient {
      /**
       * @protected
       * @param {Message} message
       */
      protected _populateMessage(message: Message): Message;
      /**
       * @protected
       * @param {import('playnix-core/device.informer').default} informer
       */
      protected registerDeviceInformer(informer: import('playnix-core/device.informer').default): void;
      deviceInformer: import("playnix-core/device.informer").default;
  }
  import { BaseLogClient } from "playnix-types/index";
  import { Message } from "playnix-types/index";

}
declare module 'playnix-core/playnix.base' {
  /// <reference types="d:/projects/playnix/client/packages/playnix-types/index" />
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
      public init(options: typeof PlaynixOptions): void;
      /**
       * @protected
       * @param {PlaynixOptions} options
       */
      protected _setup(options: typeof PlaynixOptions): void;
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
  import { PlaynixOptions } from "playnix-types/index";

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