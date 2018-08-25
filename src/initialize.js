import { ContentMessage, RequestMessage, EventMessage } from './sender'
export function message(msg) { return new ContentMessage(msg) }
export function request(msg) { return new RequestMessage(msg) }
export function event(msg) { return new EventMessage(msg) }