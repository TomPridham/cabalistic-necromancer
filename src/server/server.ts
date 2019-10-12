import https from 'https'
import Koa from 'koa'
import path from 'path'
import compress from 'koa-compress'
import serve from 'koa-static'
import Router from '@koa/router'

const app = new Koa()
const router = new Router()

type Thought = {
  currentBeer: string
  currentThought: string
  daydream: string
  name: string
}

let thoughtPromise: Promise<Thought> | null

router.get('/thought', async (ctx) => {
  try {
    if (!thoughtPromise) {
      thoughtPromise = new Promise((resolve) => {
        https.get('https://pdqweb.azurewebsites.net/api/brain', (res) => {
          let body = ''
          res.on('data', (chunk) => {
            body += chunk
          })
          res.on('end', () => {
            resolve(JSON.parse(body))
            thoughtPromise = null
          })
        })
      })
    }
    const body = await thoughtPromise
    ctx.status = 200
    ctx.body = body
    return ctx
  } catch (e) {
    ctx.body = e
    ctx.status = 400
    return ctx
  }
})

app.use(compress())
app.use(serve(path.resolve(__dirname)))
app.use(router.routes())
app.listen(3000)
