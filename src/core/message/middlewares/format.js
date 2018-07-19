/**
 * formats a message.
 * @param {Message} msg 
 */
export default function format(msg) { msg.param.message = unescape(msg.param.message.replace(/&#(\d+);/g, (match, str) => '%' + parseInt(str).toString(16))) }