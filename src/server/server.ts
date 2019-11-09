import https from 'https'
import Koa from 'koa'
import path from 'path'
import compress from 'koa-compress'
import serve from 'koa-static'
import Router from '@koa/router'
import EventEmitter from 'events'

import { Thought } from '../types'

const app = new Koa()
const router = new Router()

const requestCompletedEvent = 'request_completed'
const emitter = new EventEmitter()
let tries: number = 0
const pendingRequests: Array<
  [(body: string) => void, (error: string) => void]
> = []

router.get('/thought', async (ctx) => {
  try {
    const p: Promise<string> = new Promise((resolve, reject) => {
      pendingRequests.push([resolve, reject])
      if (pendingRequests.length === 1) {
        emitter.emit(requestCompletedEvent)
      }
    })
    ctx.body = JSON.parse(await p) as Thought
    ctx.status = 200
    return ctx
  } catch (e) {
    ctx.body = e
    ctx.status = 500
    return ctx
  }
})

emitter.on(requestCompletedEvent, async () => {
  if (!pendingRequests.length) {
    tries = 0
    return
  }
  try {
    tries += 1
    const body: string = await new Promise((resolve) => {
      https.get('https://pdqweb.azurewebsites.net/api/brain', (res) => {
        let body = ''

        res.on('data', (chunk) => {
          body += chunk
        })
        res.on('end', () => {
          if (res.statusCode !== 200) {
            throw new Error(body)
          }
          resolve(body)
        })
      })
    })

    tries = 0
    const [res] = pendingRequests.shift() || []
    if (res) {
      res(body)
      emitter.emit(requestCompletedEvent)
    }
  } catch (e) {
    if (tries < 2) {
      emitter.emit(requestCompletedEvent)
      return
    }
    const [_, rej] = pendingRequests.shift() || []
    if (rej) {
      rej(e)
    }
  }
})

app.use(compress())
app.use(serve(path.resolve(__dirname)))
app.use(router.routes())
app.listen(3000)
// eslint-disable-next-line no-console
console.log('server listening at 3000')
