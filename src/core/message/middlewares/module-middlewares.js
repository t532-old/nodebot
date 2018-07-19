import { middlewares } from '../../modules'
export default function moduleMiddlewares(msg) {
    for (let middleware of middlewares)
        await middleware(msg)
}