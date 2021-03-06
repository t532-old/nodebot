import { post } from 'axios'
import * as log from '../util/log'
import analyzer from '../util/analyzer'
import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'
const config = safeLoad(readFileSync('config/config.yml'))
const { sendAddress, injectionChecker } = config
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
export default class Message {
    startTime = new Date()
    isGroup
    isDiscuss
    isPrivate
    target
    targetUser
    static log = log
    static analyzer = analyzer
    static config = config
    static injectionChecker = new RegExp(...injectionChecker)
    /**
     * builds a message object
     * @constructor
     * @param {{ group_id: number, message_type: string, ... }} param A standard cqhttp message object
     */
    constructor(param) {
        if (param) {
            this.isGroup = param.group_id ? true : false
            this.isDiscuss = param.discuss_id ? true : false
            this.isPrivate = !(this.isGroup || this.isDiscuss)
            this.target = param.group_id || param.discuss_id || param.user_id
            this.targetUser = param.user_id
            this.region = param.post_type
            this.type = param.message_type || param.request_type || param.event
            this.param = param
        }
    }
    /**
     * this is to let developers use static methods without importing core.
     */
    static() { return Message }
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
     * unban target user
     * ADMIN REQUIRED
     * @method unban
     * @returns {AxiosPromise}
     * @throws {Error} if not in a group.
     */
    unban() {
        if (this.isGroup) return Message.unban(this.target, this.targetUser)
        else throw new Error('Not in a Group')
    }
    /**
     * ban the whole target group
     * ADMIN REQUIRED
     * @method wholeBan
     * @returns {AxiosPromise}
     * @throws {Error} if not in a group.
     */
    wholeBan() {
        if (this.isGroup) return Message.wholeBan(this.target)
        else throw new Error('Not in a Group')
    }
    /**
     * unban the whole target group
     * ADMIN REQUIRED
     * @method wholeUnban
     * @returns {AxiosPromise}
     * @throws {Error} if not in a group.
     */
    wholeUnban() {
        if (this.isGroup) return Message.wholeUnban(this.target)
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
     * @returns {AxiosPromise}
     * @throws {Error} if not in a group.
     */
    admin() {
        if (this.isGroup) return Message.admin(this.target, this.targetUser)
        else throw new Error('Not in a Group')
    }
    /**
     * unset a group member's admin permission
     * OWNER REQUIRED
     * @method unadmin
     * @returns {AxiosPromise}
     * @throws {Error} if not in a group.
     */
    unadmin() {
        if (this.isGroup) return Message.unadmin(this.target, this.targetUser)
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
    static async 'memberList'(group_id) { return (await post(`${sendAddress}/get_group_member_list`, { group_id })).data.data }
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
     * unban a user
     * @static
     * @method unban
     * @param {number} group_id
     * @param {number} user_id
     * @returns {AxiosPromise}
     */
    static async 'unban'(group_id, user_id) { return post(`${sendAddress}/set_group_ban`, { group_id, user_id, duration: 0 }) }
    /**
     * ban a whole group
     * @static
     * @method wholeBan
     * @param {number} group_id
     * @returns {AxiosPromise}
     */
    static async 'wholeBan'(group_id) { return post(`${sendAddress}/set_group_whole_ban`, { group_id, enable: true }) }
    /**
     * unban a whole group
     * @static
     * @method wholeUnban
     * @param {number} group_id
     * @returns {AxiosPromise}
     */
    static async 'wholeUnban'(group_id) { return post(`${sendAddress}/set_group_whole_ban`, { group_id, enable: false }) }
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
     * set an admin of a group
     * @static
     * @method admin
     * @param {number} group_id
     * @param {number} user_id
     * @returns {AxiosPromise}
     */
    static async 'admin'(group_id, user_id) { return post(`${sendAddress}/set_group_admin`, { group_id, user_id, enable: true }) }
    /**
     * unset an admin of a group
     * @static
     * @method admin
     * @param {number} group_id
     * @param {number} user_id
     * @returns {AxiosPromise}
     */
    static async 'unadmin'(group_id, user_id) { return post(`${sendAddress}/set_group_admin`, { group_id, user_id, enable: false }) }
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
    static async 'enter'(flag, approve) { return post(`${sendAddress}/set_group_add_request`, { approve, flag, type: 'add' }) }
}