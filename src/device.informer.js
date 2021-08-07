export default class DeviceInformer
{
    constructor()
    {
        if (!DeviceInformer.instance)
        {

            DeviceInformer.instance = this;
        }

        return DeviceInformer.instance;
    }

    init() {}

    /**
     * @description Get the device OS
     * @returns {{name:String,version:String}}
     */
    getOS() {}

    /**
    * @description Get device model details
    * @returns {{vendor:String,model:String}}
    */
    getDevice() {}

    /**
    * @description Get runtine engine - for browser only
    * @returns {{name:String,version:String}}
    */
    getEngine() {}
}