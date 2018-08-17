import Message from './message'
import { requestLog } from '../../log'
/**
 * a class that can be used to process requests
 * @class
 * @name ContentMessage
 * @extends Message
 * @property {string} flag the request flag
 * @property {string?} requestType the request type (if from group)
 */
export default class RequestMessage extends Message {
    flag
    requestType
    constructor(param) {
        super(param)
        this.flag = param.flag
        this.requestType = param.sub_type
    }
    /**
     * accept or refuse the request
     * @method send
     * @param {boolean} approve
     */
    send(approve) {
        requestLog(this, approve)
        if (this.requestType === 'add') return Message.enter(this.flag, approve)
        else return Message.request[this.type](this.flag, approve)
    }
}
