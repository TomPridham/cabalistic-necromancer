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
      // add incoming requests to a queue
      pendingRequests.push([resolve, reject])
      // if there is only one pending request, trigger the fetching process
      if (pendingRequests.length === 1) {
        emitter.emit(requestCompletedEvent)
      }
    })
    ctx.status = 200
    ctx.body = JSON.parse(await p) as Thought
  } catch (e) {
    ctx.status = 500
    ctx.body = e
  }
})

const makeRequest = (): Promise<string> =>
  new Promise((resolve, reject) => {
    https.get('https://pdqweb.azurewebsites.net/api/brain', (res) => {
      let body = ''

      res.on('data', (chunk) => {
        body += chunk
      })
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(body)
        } else {
          resolve(body)
        }
      })
    })
  })

emitter.on(requestCompletedEvent, async () => {
  // don't do anything if there aren't pending requests
  if (!pendingRequests.length) {
    tries = 0
    return
  }

  try {
    tries += 1
    const body: string = await makeRequest()
    tries = 0
    const [res] = pendingRequests.shift() || []
    if (res) {
      res(body)
      emitter.emit(requestCompletedEvent)
    }
  } catch (e) {
    // only retry once so clients don't get stuck in a loop if the server is dead for some reason
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
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('server listening at 3000')
})
