import * as initialize from './initialize'
import format from './format'
import moduleMiddlewares from './module-middlewares'
import aliasify from './aliasify'
import execute from './execute'
import requestHandler from './request'
export const message = [ initialize.content, format, moduleMiddlewares, aliasify, execute ]
export const request = [ initialize.request, requestHandler ]