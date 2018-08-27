/**
 * formats a message.
 * @param {ContentMessage} msg 
 */
export default function format(msg) { msg.content = unescape(msg.content.replace(/&#(\d+);/g, (match, str) => '%' + parseInt(str).toString(16))) }