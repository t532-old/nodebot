const Koa = require('koa')
const body = require('koa-body')

const message = require('./message')

const app = new Koa()

app.use(body());

app.use(async ctx => {
    ctx.body = message.handle(ctx.request.body)
});

app.listen(8080)