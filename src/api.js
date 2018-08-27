import { Message } from './sender'

export default async function handleAPI(operation) {
    let result
    try { result = await Message[operation.name](...operation.params) }
    catch (err) { return { status: 'ierror', error: err.stack } }
    return result.data || result
}