import Message from './message'
/**
 * a class that can be used to send message back
 * @class
 * @name ContentMessage
 * @extends Message
 * @property {string} content the message content
 */
export default class ContentMessage extends Message {
    content
    constructor(param) {
        super(param)
        this.content = param.message
        Message.log.incomeLog(this, this.startTime)
    }
    /**
     * Send a message back to the target
     * @method send
     * @param {string|array} message The message that'll be sent
     */
    send(message) {
        Message[this.type](this.target, message)
        Message.log.outgoLog(this, message, this.startTime)
    }
    /**
     * send an error message to the target and log the error
     * @method error
     * @param {Error} err 
     */
    error(err) {
        this.send([
            {
                type: 'text',
                data: {
                    text: '很遗憾，发生了一个未预料到的错误。请过会重试；同时，请您复制下面的信息：\n' +
                            new Date().toString() + ': ' +
                            err.toString() + 
                            '\n并到 https://gitlab.com/trustgit/nodebot/issues 提交issue或私聊' 
                }
            },
            {
                type: 'at',
                data: { qq: '2037246484' }
            },
        ])
        Message.log.errorLog(err)
    }
    isInjection() { return Message.injectionChecker.test(this.content) }
}