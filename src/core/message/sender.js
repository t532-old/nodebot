import { post } from 'axios'
import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'
import { errorLog, incomeLog, outgoLog } from '../log'
const { sendAddress } = safeLoad(readFileSync('config.yml'))
/**
 * A class that stores message info in a more readable way.
 * Also provides methods to response the message.
 * @class
 * @name Message
 * @property {Date} startTime When is the message object created
 * @property {boolean} isGroup
 * @property {boolean} isDiscuss
 * @property {boolean} isPrivate
 * @property {number} target The target group id or discuss id or qqid (fallback when private)
 * @property {number} targetUser The target qqid
 * @property {string} type The message_type || request_type || event
 * @property {{ group_id: number, message_type: string, ... }} param the raw cqhttp POST message
 */
export class Message {
    #startTime = new Date()
    isGroup
    isDiscuss
    isPrivate
    target
    targetUser
    /**
     * builds a message object
     * @constructor
     * @param {{ group_id: number, message_type: string, ... }} param A standard cqhttp message object
     */
    constructor(param) {
        this.isGroup = new Boolean(param.group_id)
        this.isDiscuss = new Boolean(param.discuss_id)
        this.isPrivate = !(this.isGroup || this.isDiscuss)
        this.target = param.group_id || param.discuss_id || param.user_id
        this.targetUser = param.user_id
        this.region = param.post_type
        this.type = param.message_type || param.request_type || param.event
        this.param = param
    }
    /**
     * get target user's info.
     * @method info
     * @returns {{ user_id: number, nickname: string, sex: string, age: number, group_id?: number, card?: number, area?: string, join_time?: number, last_sent_time?: number, level?: string, role?: string, unfriendly?: boolean, title?: string, title_expire_time?: number, card_changeable?: boolean }[]}
     */
    info() { return this.isGroup ? Message.userInfo(this.targetUser, this.target) : Message.userInfo(this.targetUser) }
    /**
     * get group members' info.
     * @method memberList
     * @returns {{ user_id: number, nickname: string, sex: string, age: number, group_id: number, card: number, area: string, join_time: number, last_sent_time: number, level: string, role: string, unfriendly: boolean, title: string, title_expire_time: number, card_changeable: boolean }[]}
     * @throws {Error} if not in a group or discuss.
     */
    memberList() {
        if (this.isGroup) return Message.memberList(this.target)
        else throw new Error('Not in a Group')
    }
    /**
     * leave the target group or discuss
     * @method leave
     * @returns {AxiosPromise}
     * @throws {Error} if not in a group or discuss.
     */
    leave() {
        if (this.isGroup) return Message.leave(this.target)
        else if (this.isDiscuss) return Message.leaveDiscuss(this.target)
        else throw new Error('Not in a Group or Discuss')
    }
    /**
     * kick target user
     * ADMIN REQUIRED
     * @method kick
     * @param {boolean} rejectAddRequest
     * @returns {AxiosPromise}
     * @throws {Error} if not in a group.
     */
    kick(rejectAddRequest = false) { 
        if (this.isGroup) return Message.kick(this.target, this.targetUser, rejectAddRequest) 
        else throw new Error('Not in a Group')
    }
    /**
     * ban target user
     * ADMIN REQUIRED
     * @method ban
     * @param {number} duration seconds = 10 * 60
     * @returns {AxiosPromise}
     * @throws {Error} if not in a group.
     */
    ban(duration) {
        if (this.isGroup) return Message.ban(this.target, this.targetUser, duration)
        else throw new Error('Not in a Group')
    }
    /**
     * ban the whole target group
     * ADMIN REQUIRED
     * @method wholeBan
     * @param {boolean} enable whether ban or unban
     * @returns {AxiosPromise}
     * @throws {Error} if not in a group.
     */
    wholeBan(enable) {
        if (this.isGroup) return Message.wholeBan(this.target, enable)
        else throw new Error('Not in a Group')
    }
    /**
     * rename group member
     * ADMIN REQUIRED
     * @method rename
     * @param {string} card
     * @returns {AxiosPromise}
     * @throws {Error} if not in a group.
     */
    rename(card) {
        if (this.isGroup) return Message.rename(this.target, this.targetUser, card)
        else throw new Error('Not in a Group')
    }
    /**
     * set a group member's admin permission
     * OWNER REQUIRED
     * @method admin
     * @param {boolean} enable whether set or unset.
     * @returns {AxiosPromise}
     * @throws {Error} if not in a group.
     */
    admin(enable) {
        if (this.isGroup) return Message.admin(this.target, this.targetUser, enable)
        else throw new Error('Not in a Group')
    }
    /**
     * Sends a private message
     * @static
     * @method private
     * @param {number} user_id The target user's qq id.
     * @param {string|array} message The message
     * @returns {AxiosPromise}
     */
    static async 'private'(user_id, message) { return post(`${sendAddress}/send_private_msg`, { user_id, message }) }
    /**
     * Sends a group message
     * @static
     * @method group
     * @param {number} group_id The target qq group id.
     * @param {string|array} message The message
     * @returns {AxiosPromise}
     */
    static async 'group'(group_id, message) { return post(`${sendAddress}/send_group_msg`, { group_id, message }) }
    /**
     * Sends a discuss message
     * @static
     * @method discuss
     * @param {number} discuss_id The target qq discuss id.
     * @param {string|array} message The message
     * @returns {AxiosPromise}
     */
    static async 'discuss'(discuss_id, message) { return post(`${sendAddress}/send_discuss_msg`, { discuss_id, message }) }
    /**
     * get group list
     * @static
     * @method groupList
     * @returns {{ group_id: number, group_name: string }[]}
     */
    static async 'groupList'() { return (await post(`${sendAddress}/get_group_list`)).data.data }
    /**
     * get group member list
     * @static
     * @method memberList
     * @param {number} group_id
     * @returns {{ user_id: number, nickname: string, sex: string, age: number, group_id?: number, card?: number, area?: string, join_time?: number, last_sent_time?: number, level?: string, role?: string, unfriendly?: boolean, title?: string, title_expire_time?: number, card_changeable?: boolean }[]}
     */
    static async 'memberList'(group_id) { return (await post(`${sendAddress}/get_group_member_list`)).data.data }
    /**
     * get user info
     * @static
     * @method userInfo
     * @param {number} user_id
     * @param {number?} group_id
     * @returns {{ user_id: number, nickname: string, sex: string, age: number, group_id?: number, card?: number, area?: string, join_time?: number, last_sent_time?: number, level?: string, role?: string, unfriendly?: boolean, title?: string, title_expire_time?: number, card_changeable?: boolean }}
     */
    static async 'userInfo'(user_id, group_id) { 
        return group_id ? 
               (await post(`${sendAddress}/get_stranger_info`), { user_id }).data.data : 
               (await post(`${sendAddress}/get_group_member_info`), { user_id, group_id }).data.data 
    }
    /**
     * get self info
     * @static
     * @method selfInfo
     * @returns {{ user_id: number, nickname: string }}
     */
    static async 'selfInfo'() { 
        return (await post(`${sendAddress}/get_login_info`)).data.data
    }
    /**
     * kick a user
     * @static
     * @method kick
     * @param {number} group_id
     * @param {number} user_id
     * @param {boolean} reject_add_request = false (true => reject, false => don't reject)
     * @returns {AxiosPromise}
     */
    static async 'kick'(group_id, user_id, reject_add_request = false) { return post(`${sendAddress}/set_group_kick`, { group_id, user_id, reject_add_request }) }
    /**
     * ban a user
     * @static
     * @method ban
     * @param {number} group_id
     * @param {number} user_id
     * @param {number} duration = 10 * 60
     * @returns {AxiosPromise}
     */
    static async 'ban'(group_id, user_id, duration = 10 * 60) { return post(`${sendAddress}/set_group_ban`, { group_id, user_id, duration }) }
    /**
     * ban a whole group
     * @static
     * @method wholeBan
     * @param {number} group_id
     * @param {boolean} enable = true (true => ban, false => unban)
     * @returns {AxiosPromise}
     */
    static async 'wholeBan'(group_id, enable = true) { return post(`${sendAddress}/set_group_whole_ban`, { group_id, enable }) }
    /**
     * leave a group
     * @static
     * @method leave
     * @param {number} group_id 
     * @returns {AxiosPromise}
     */
    static async 'leave'(group_id) { return post(`${sendAddress}/set_group_leave`, { group_id }) }
    /**
     * leave a discuss
     * @static
     * @method leaveDiscuss
     * @param {number} discuss_id
     * @returns {AxiosPromise}
     */
    static async 'leaveDiscuss'(discuss_id) { return post(`${sendAddress}/set_discuss_leave`, { discuss_id }) }
    /**
     * rename a user's group card
     * @static
     * @method rename
     * @param {number} group_id
     * @param {number} user_id
     * @param {string} card
     * @returns {AxiosPromise}
     */
    static async 'rename'(group_id, user_id, card) { return post(`${sendAddress}/set_group_card`, { group_id, user_id, card }) }
    /**
     * rename a user's group card
     * @static
     * @method admin
     * @param {number} group_id
     * @param {number} user_id
     * @param {boolean} enable = true (true => set, false => unset)
     * @returns {AxiosPromise}
     */
    static async 'admin'(group_id, user_id, enable = true) { return post(`${sendAddress}/set_group_admin`, { group_id, user_id, enable }) }
    /**
     * process for requests
     * @static
     */
    static request = {
        /**
         * process friend add request
         * @static
         * @method friend
         * @param {number} flag
         * @param {boolean} approve whether you accept or refuse
         * @returns {AxiosPromise}
         */
        async 'friend'(flag, approve) { return post(`${sendAddress}/set_friend_add_request`, { approve, flag }) },
        /**
         * process group invitation
         * @static
         * @method group
         * @param {number} flag
         * @param {boolean} approve whether you accept or refuse
         * @returns {AxiosPromise}
         */
        async 'group'(flag, approve) { return post(`${sendAddress}/set_group_add_request`, { approve, flag, type: 'invite' }) },
    }
    /**
     * process group add request
     * @static
     * @method enter
     * @param {number} flag
     * @param {boolean} approve whether you accept or refuse
     * @returns {AxiosPromise}
     */
    async 'enter'(flag, approve) { return post(`${sendAddress}/set_group_add_request`, { approve, flag, type: 'add' }) }
}

/**
 * a class that can be used to send message back
 * @class
 * @name ContentMessage
 * @extends Message
 */
export class ContentMessage extends Message {
    constructor(param) {
        super(param)
        incomeLog(this, this.#startTime)
    }
    /**
     * Send a message back to the target
     * @method send
     * @param {string|array} message The message that'll be sent
     */
    send(message) {
        Message[this.type](this.target, message)
        outgoLog(this, message, this.#startTime)
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
        errorLog(err)
    }
}

/**
 * a class that can be used to process requests
 * @class
 * @name ContentMessage
 * @extends Message
 * @property {string} flag the request flag
 * @property {string?} requestType the request type (if from group)
 */
export class RequestMessage extends Message {
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
        if (this.requestType === 'add') return Message.enter(this.flag, approve)
        else return Message.request[this.type](this.flag, approve)
    }
}

export class EventMessage extends Message {
    constructor(param) { super(param) }
    // TODO: write something to process events.
}
