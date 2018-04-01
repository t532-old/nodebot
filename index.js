const Koa = require('koa')
const Router = require('koa-router')
const body = require('koa-body')

const message = require('./message')

const app = new Koa()

app.use(body());

app.use(async ctx => {
    console.log(ctx.request.body)
    message.handle(ctx.request.body)
});

app.listen(8080)