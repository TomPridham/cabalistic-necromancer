import https from 'https'
import Koa from 'koa'
import path from 'path'
import compress from 'koa-compress'
import serve from 'koa-static'
import Router from '@koa/router'

const app = new Koa()
const router = new Router()

let thoughtPromise: Promise<string> | null

router.get('/thought', async (ctx) => {
  try {
    if (!thoughtPromise) {
      thoughtPromise = new Promise((resolve) => {
        https
          .get('https://pdqweb.azurewebsites.net/api/brain', (res) => {
            let body = ''
            res.on('data', (chunk) => {
              body += chunk
            })
            res.on('end', () => {
              resolve(body)
              thoughtPromise = null
            })
          })
          .on('error', () => {
            throw new Error('Another one down')
          })
      })
    }
    ctx.status = 200
    ctx.body = JSON.parse(await thoughtPromise)
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
// eslint-disable-next-line no-console
console.log('server listening at 3000')
