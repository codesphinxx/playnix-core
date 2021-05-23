import { BaseLogClient, Event, Exception, Message, ScorenixOptions } from 'scorenix-types';
import Utils from "./utils";

export default class LogClient extends BaseLogClient
{
    /**
     * @protected
     * @param {Message} message 
     */
    _populateMessage(message)
    {
        message.os = this.deviceInformer.getOS();
        message.engine = this.deviceInformer.getEngine();
        message.device = this.deviceInformer.getDevice();
        return message;
    }

    /**
     * @protected
     * @param {Error} error
     */
    _createException(error) 
    {
        let exception = new Exception(error, true);
        return exception;
    }

    /**
    * @public
    * @description Initializes scorenix's logging client.
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
        super.init(key, options);
        this._xhttp = new XMLHttpRequest();
        this._xhttp.onreadystatechange = this._onreadystatechange.bind(this);
    }

    /**
     * @protected
     * @param {import('./device.informer').default} informer 
     */
    registerDeviceInformer(informer)
    {  
        if (!informer)
        {
            throw new Error('NullArgument: DeviceInformer cannot be null');
        }
        this.deviceInformer = informer;
        this.deviceInformer.init();
    }

    /**
     * @public
     * @param {String} username 
     */
    setAppUser(username)
    {
        if (!Utils.isNullOrEmpty(username))
        {
            this._user = String(username);
        }
    }

    /**
     * @public
     * @param {String} version App version info
     */
    setAppVersion(version)
    {
        if (!Utils.isNullOrEmpty(version))
        {
            this._user_version = String(version);
        }        
    }

    /**
     * @param {Object|Array} data
     */
    setMetaContext(data)
    {
        if (!data) return;

        if (!Array.isArray(data) && typeof data === 'object')
        {
            data = JSON.parse(JSON.stringify(data));
        }
        this._meta = data;
    }

    /**
    * @param {String} message the custom message to log
    * @param {Object} data additional data to send(must contains values of string, number, or boolean)
    */
    writeMessage(message)
    {
        let msg = new Message(message);
        evt = this._populateMessage(evt);
        this._commit(msg);
    }

    /**
    * @param {String} id event id
    * @param {String} message event message
    * @param {String} action event action
    */
    writeEvent(message, id, action)
    {
        let evt = new Event(id, message, action);
        evt = this._populateMessage(evt);
        this._commit(evt);
    }

    /**
    * @param {Error} error Error object to log.
    * @param {Object} data additional data to send(must contains values of string, number, or boolean)
    */
    writeException(error, data)
    {
        console.log(error);
        if (!error) return;
        
        let ex = this._createException(error);
        ex = this._populateMessage(ex);
        if (data)
        {
            ex.extra = Utils.primitify(data);
        }
        this._commit(ex);
    }
}