import { Bindings, Hono } from 'hono'
import Layout from '@/controls/Layout.jsx'
import Homepage from '@/pages/Homepage.js'
import HtmxPage from '@/pages/Htmx.js'
import Users from '@/pages/Users.js'
import Comments from '@/pages/Comments.js'
import Nuejs from '@/pages/Nuejs.js'
import Private from '@/pages/Private.js'
import { z } from 'zod'
import { sign } from 'hono/jwt'
import Bugs from "./pages/Bugs.js"

import { initHtmxPage } from './pages/Htmx.js'
import { initComments } from './pages/Comments.js'
import { initUsers } from './pages/Users.js'
import { initCityPicker } from "./controls/CityPicker.js"
import { jsxRenderer } from 'hono/jsx-renderer'
import { withVars } from "./framework/withVars.js"
import { HTTPException } from "hono/http-exception"
import { getCookie, setCookie } from "hono/cookie"
import { zValidator } from '@hono/zod-validator'
import { bearerAuth } from "hono/bearer-auth"
import Login from "./pages/Login.js"

export type App = Hono<{ Bindings: Bindings }>

const app = new Hono<{ Bindings: Bindings }>()

// register all middlewares
app.use('*', jsxRenderer())

app.use('/private/*', bearerAuth({
    verifyToken: async (token, c) => {
        return token === getCookie(c, 'token')
    }
}))

// wire up pages and controls
initHtmxPage(app)
initComments(app)
initUsers(app)
initCityPicker(app)

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: "Minimum eight characters, at least one letter, one number and one special character" }
    )
})

// register deeplink routes for full page redraw from scratch
app.get('/', withVars(v => <Layout vars={v}><Homepage /></Layout>))
app.get('/login', withVars(v => <Layout vars={v}><Login /></Layout>))
app.get('/htmx', withVars(v => <Layout vars={v}><HtmxPage /></Layout>))
app.get('/users', withVars(v => <Layout vars={v}><Users /></Layout>))
app.get('/comments', withVars(v => <Layout vars={v}><Comments /></Layout>))
app.get('/bugs', withVars(v => <Layout vars={v}><Bugs /></Layout>))
app.get('/nuejs', withVars(v => <Layout vars={v}><Nuejs /></Layout>))
app.get('/private/home', withVars(v => <Layout vars={v}><Private /></Layout>))

app.post('/auth/login', zValidator('json', loginSchema), async (c) => {
    const { email, password } = await c.req.json()
    console.log('>>> c.var.TEST_PWORD:', c.env.TEST_PWORD)
    if (password != c.env.TEST_PWORD) {

        throw new HTTPException(401, { message: "Invalid credentials." })
    }
    const payload = {
        email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 // set token expiration for 1 hour from now.
    }
    if (!c.env.SECRET) {
        console.error("c.env.SECRET not set! Cannot log users in, cannot create signed tokens!")
        throw new HTTPException(503, { message: "Service temporarily unavailable." })
    }
    const token = await sign(payload, c.env.SECRET || 'secret-not-set-12947492')
    setCookie(c, 'token', token)
    return c.json({ payload, token })
})

export default app