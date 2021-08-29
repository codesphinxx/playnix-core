import { PlaynixOptions } from "playnix-types/index";

export default class PlaynixBaseClient
{
    constructor()
    {
        if (!PlaynixBaseClient.singleton)
        {
            /**
             * @private
             * @type {String}
             */
            this.token = null;
            /**
             * @private
             * @type {PlaynixOptions}
             */
            this.options = null;

            PlaynixBaseClient.singleton = this;
        }

        return PlaynixBaseClient.singleton;
    }

    /**
     * @public
     */
    get isAuthenticated ()
    {
        return false;
    }

    /**
    * @public
    * @description Initializes the playnix session.
    * @param {PlaynixOptions} options
    */
    init(options)
    {
        this._setup(options);
    }

    /**
     * @protected
     * @param {PlaynixOptions} options 
     */
    _setup(options) {}

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

    /**
     * @public
     * @description Checks player login status
     * @returns {Object} player ref
     */
    getLoginStatus() {}
}