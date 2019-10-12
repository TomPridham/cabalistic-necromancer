import https from 'https'
import Koa from 'koa'
import Router from '@koa/router'

const app = new Koa()
const router = new Router()

type Thought = {
  currentBeer: string
  currentThought: string
  daydream: string
  name: string
}

router.get('/thought', async (ctx) => {
  try {
    await new Promise((resolve, reject) => {
      https.get('https://pdqweb.azurewebsites.net/api/brain', (res) => {
        let body = ''
        res.on('data', (chunk) => {
          body += chunk
        })
        res.on('end', () => {
          ctx.status = 200
          ctx.body = body
          resolve()
        })
      })
    })
    return ctx
  } catch (e) {
    ctx.body = e
    ctx.status = 400
    return ctx
  }
})

app.use(router.routes())
app.listen(3000)
