import { BaseLogClient, Event, Exception, Message, PlaynixOptions } from 'playnix-types';
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
    * @description Initializes playnix's logging client.
    * @param {String} key
    * @param {PlaynixOptions} options
    */
    init(options)
    {        
        super.init(options);
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
     * @public
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
    * @public
    * @param {String} message the custom message to log
    * @param {Object} data additional data to send(must contains values of string, number, or boolean)
    */
    writeMessage(message)
    {
        let msg = new Message(message);
        this._populateMessage(msg);
        this._commit(msg);
    }

    /**
    * @public
    * @param {String} id event id
    * @param {String} message event message
    * @param {String} category event action
    */
    writeEvent(message, id, category)
    {
        let evt = new Event(id, message, category);
        this._populateMessage(evt);
        this._commit(evt);
    }

    /**
    * @public
    * @param {Error} error Error object to log.
    * @param {Object} data additional data to send(must contains values of string, number, or boolean)
    */
    writeException(error, data)
    {
        if (!error) return;
        
        let ex = this._createException(error);
        ex = this._populateMessage(ex);
        if (data)
        {
            ex.extra = JSON.parse(JSON.stringify(data));
        }
        this._commit(ex);
    }
}