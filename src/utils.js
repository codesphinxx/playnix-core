import {LoggingConfig} from 'scorenix-types';

export default class Utils
{
    constructor()
    {
        throw new Error('This is a static class');
    }

    static stringify(value)
    {
        if (value === null) return '';
        if (typeof value === 'function' || typeof value === 'symbol' || typeof value === 'undefined') return '';
        
        let result = '';
        
        if (Array.isArray(value))
        {
            result = '';
            for(let i = 0; i < value.length; i++)
            {
                let data_type = typeof value[i];
                if (Utils.PRIMITIVES.indexOf(data_type) != -1)
                {
                    result += i===0 ? Utils.stringify(value[i]) : ' ' + Utils.stringify(value[i]);
                }
                else
                {
                    result += i===0 ? Utils.stringify(value[i]) : ', ' + Utils.stringify(value[i]);
                }                
            }
        }
        else if (typeof value === 'object')
        {
            let index = 0;
            result = '{';
            for (let key in value)
            {
                let node = key.toString() + ': ';
                node += Array.isArray(value[key]) ? ('[' + Utils.stringify(value[key]) + ']') : Utils.stringify(value[key]);
                result += index===0 ? node : ', ' + node;
                index++;
            }  
            if (index === 0 && value.toString)
            {
                result += value.toString();
            }  
            result += '}';        
        }
        else
        {
            result += value;
        }        
    
        return result;
    }

    static primitify(value)
    {
        if (typeof value === 'function' || typeof value === 'symbol' || typeof value === 'undefined' || value === null) return {};
        
        let result;
    
        if (Array.isArray(value))
        {
            result = [];
            for(let i = 0; i < value.length; i++)
            {
                let data_type = typeof value[i];
                if (Utils.PRIMITIVES.indexOf(data_type) != -1)
                {
                    result.push(value[i]);
                } 
                else if (value[i] instanceof Date)
                {
                    result.push(value[i]);
                }               
            }
        }
        else if (typeof value === 'object')
        {
            result = {};
            for (let key in value)
            {
                let data_type = typeof value[key];
                if (Utils.PRIMITIVES.indexOf(data_type) != -1)
                {
                    result[key] = value[key];
                }
            }          
        }
        else
        {
            result = value;
        }        
    
        return result;
    }

    static isLogLevel(value)
    {
        return value ? ([LoggingConfig.LOGS.ERROR,LoggingConfig.LOGS.INFO,LoggingConfig.LOGS.WARN].indexOf(value) !== -1) : false;
    }

    static isObject(what) 
    {
        return typeof what === 'object' && what !== null;
    }
      
    static isError(value) 
    {
        switch ({}.toString.call(value)) 
        {
          case '[object Error]':
            return true;
          case '[object Exception]':
            return true;
          case '[object DOMException]':
            return true;
          default:
            return value instanceof Error;
        }
    }
    
    static isNull(value) 
    {
        return value == null || value == undefined;
    }

    /**
     * @param {String} value 
     */
    static isNullOrEmpty(value)
    {
        if (value === null || value === undefined)
            return true;

        if (typeof value != 'string')
        {
            return true;
        }

        let text = value.replace('/ /g', '');

        if (text.length === 0)
            return true;
    }
}

Utils.PRIMITIVES = ['undefined','boolean','number','string'];