import { ContentMessage, RequestMessage } from '../sender'
export function content(msg) { return new ContentMessage(msg) }
export function request(msg) { return new RequestMessage(msg) }