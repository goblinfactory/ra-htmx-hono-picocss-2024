import { App } from "@/index.js"
import { zValidator } from "@hono/zod-validator"
import { HTTPException } from "hono/http-exception"
import { z } from 'zod'
import { sign } from 'hono/jwt'
import { setCookie } from "hono/cookie"

const loginSchema = z.object({
    email: z.string().email(),
    remember: z.boolean().optional(),
    password: z.string().min(10)
})

export const initAuthLogin = (app: App) => {

    app.post('/auth/login',
        zValidator('json', loginSchema),
        async (c) => {

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
            c.header('HX-Redirect', '/logged-in')
            return c.html("logged in", 200)
        })
}