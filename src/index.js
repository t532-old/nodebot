import Koa from 'koa'
import body from 'koa-body'

import message from './message'

const app = new Koa()

app.use(body());

app.use(async ctx => {
    message.handle(ctx.request.body)
});

app.listen(8080)