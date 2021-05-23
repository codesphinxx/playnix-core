import { ScorenixOptions } from 'scorenix-types';

export default class ScorenixBaseClient
{
    constructor()
    {
        if (!ScorenixBaseClient.singleton)
        {
            /**
             * @private
             * @type {String}
             */
            this.game = null;
            /**
             * @private
             * @type {String}
             */
            this.token = null;
            /**
             * @private
             * @type {ScorenixOptions}
             */
            this.options = null;

            ScorenixBaseClient.singleton = this;
        }

        return ScorenixBaseClient.singleton;
    }

    get isAuthenticated ()
    {
        return false;
    }

    /**
    * @public
    * @description Initializes the scorenix session.
    * @param {String} key
    * @param {Object} options
    * @param {Boolean} options.debug
    * @param {String} options.uri
    * @param {String} options.method
    * @param {String} options.protocol
    * @param {String} options.environment
    */
    init(key, options)
    {
        this.game = key;
        this._setup(key, options);
    }

    /**
     * @protected
     * @param {String} key 
     * @param {Object} options 
     */
    _setup(key, options) {}

    /**
     * @public
     * @description Verifies the user social login access token
     * @param {String} sid Social prodiver user Id
     * @param {String} provider Social provider ie {Goole, Facebook}
     * @param {String} token Access token generated from social login
     */
    authenticate(sid, provider, token) {}

    /**
     * @public
     * @description Saves player data
     * @param {Object} data 
     */
    saveGameData(data) {}

    /**
     * @public
     * @description Loads player save data
     */
    loadGameData() {}
}