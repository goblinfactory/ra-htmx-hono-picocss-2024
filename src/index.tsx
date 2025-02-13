import { Bindings, Hono } from 'hono'
import Layout from '@/controls/Layout.jsx'
import Homepage from '@/pages/Homepage.js'
import HtmxPage from '@/pages/Htmx.js'
import Users from '@/pages/Users.js'
import Comments from '@/pages/Comments.js'
import Nuejs from '@/pages/Nuejs.js'
import Private from '@/pages/Private.js'
import { z } from 'zod'
import { jwt, JwtVariables, sign } from 'hono/jwt'
import Bugs from "./pages/Bugs.js"

import { initHtmxPage } from './pages/Htmx.js'
import { initComments } from './pages/Comments.js'
import { initUsers } from './pages/Users.js'
import { initCityPicker } from "./controls/CityPicker.js"
import { jsxRenderer } from 'hono/jsx-renderer'
import { withVars } from "./framework/withVars.js"
import { HTTPException } from "hono/http-exception"
import { setCookie } from "hono/cookie"
import { zValidator } from '@hono/zod-validator'
import Login from "./pages/Login.js"
import Logout from "./pages/Logout.js"

export type App = Hono<{ Bindings: Bindings & JwtVariables }>

const app = new Hono<{ Bindings: Bindings & JwtVariables }>()

// register all middlewares
app.use('*', jsxRenderer())

app.use('/private/*',
    jwt({
        secret: 'server-1294323-$',  // if you clone this project, please change this value.
        cookie: 'token'
    })
)

// wire up pages and controls
initHtmxPage(app)
initComments(app)
initUsers(app)
initCityPicker(app)

const loginSchema = z.object({
    email: z.string().email(),
    remember: z.boolean().optional(),
    password: z.string().min(10)
})

// register deeplink routes for full page redraw from scratch
app.get('/', withVars(v => <Layout vars={v}><Homepage /></Layout>))
app.get('/htmx', withVars(v => <Layout vars={v}><HtmxPage /></Layout>))
app.get('/users', withVars(v => <Layout vars={v}><Users /></Layout>))
app.get('/comments', withVars(v => <Layout vars={v}><Comments /></Layout>))
app.get('/bugs', withVars(v => <Layout vars={v}><Bugs /></Layout>))
app.get('/nuejs', withVars(v => <Layout vars={v}><Nuejs /></Layout>))
app.get('/private/home', withVars(v => <Layout vars={v}><Private /></Layout>))
app.get('/login', withVars(v => <Layout vars={v}><Login /></Layout>))
app.get('/logout', withVars((v, c) => <Layout vars={v}><Logout c={c} /></Layout>))

app.post('/auth/login', zValidator('json', loginSchema), async (c) => {

    if (!c.env.SERVER_SECRET) {
        console.error("c.env.SECRET not set! Cannot log users in, cannot create signed tokens!")
        throw new HTTPException(503, { message: "Service temporarily unavailable." })
    }

    const { email, password, remember } = await c.req.json()
    console.log('>>> c.var.TEST_PWORD:', c.env.TEST_PWORD)
    if (password != c.env.TEST_PWORD) {
        throw new HTTPException(401, { message: "Invalid credentials." })
    }

    const howLong = Math.floor(Date.now() / 1000) + 60 * 60 // set token expiration for 1 hour from now.

    const payload = {
        email,
        exp: howLong
    }

    const token = await sign(payload, c.env.SERVER_SECRET || 'secret-not-set-48374')

    const cookieOptions = remember ? { maxAge: 60 * 60 } : {}
    setCookie(c, 'token', token, cookieOptions)

    return c.html(
        <div>
            <h1>Login Successful!</h1>
            <p>Thank you for logging in, {email}.</p>
            <a href='/auth/logout'>Logout</a>
        </div>
    )
})

export default app