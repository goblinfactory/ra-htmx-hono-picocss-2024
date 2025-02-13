import { Hono } from "hono"
import { jwt } from "hono/jwt"

import { describe, beforeEach, expect, it } from 'vitest'

describe('Credentials in signed cookie', () => {
    let handlerExecuted: boolean

    beforeEach(() => {
        handlerExecuted = false
    })

    const app = new Hono()
    const SECRET = "a-secret" // this is the private server secret used to encrypt Jwt tokens after succesfully logging in.

    app.use(
        '/auth/*',
        jwt({
            secret: SECRET,
            cookie: {
                key: 'cookie_name',
                secret: 'cookie_secret',
            },
        })
    )

    app.get('/auth/*', async (c) => {
        console.log(">> app.get /auth/* called! with url:", c.req.url)
        handlerExecuted = true
        const payload = c.get('jwtPayload')
        return c.json(payload)
    })

    // This code commented out, so that it does not get deployed to in production.
    // Uncomment this code, and run locally to learn more about Jtw tokens
    // also, watch this excellent video : 
    // Learn api JWT authentication:  https://www.youtube.com/watch?v=doZ6Y0oub_8
    // ---
    // app.post('/encrypt', async (c) => {
    //     console.log(">> /encrypt/:text")
    //     const secret = 'encryption_secret'

    //     try {
    //         const body = await c.req.parseBody()
    //         const token = await jwt.sign(body, secret)
    //         return c.json({ token: token })
    //     } catch (err) {
    //         return c.text('Invalid JSON payload or error encrypting', 400)
    //     }
    // })

    // it('jwt lib should encrypt text', async () => {
    //     const body = JSON.stringify({ message: 'hello world' })
    //     const req = new Request('http://localhost/encrypt', { method: "POST", body })
    //     const res = await app.request(req)
    //     expect(res).not.toBeNull()
    //     expect(res.status).toBe(200)
    //     //expect(await res.json()).toEqual({ message: 'hello world' })
    // })

    it('Should not authorize', async () => {
        const req = new Request('http://localhost/auth/a')
        const res = await app.request(req)
        expect(res).not.toBeNull()
        expect(res.status).toBe(401)
        expect(await res.text()).toBe('Unauthorized')
        expect(handlerExecuted).toBeFalsy()
    })

    it('Should authorize', async () => {
        const url = 'http://localhost/auth/a'
        const req = new Request(url, {
            headers: new Headers({
                Cookie:
                    'cookie_name=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiaGVsbG8gd29ybGQifQ.B54pAqIiLbu170tGQ1rY06Twv__0qSHTA0ioQPIOvFE.i2NSvtJOXOPS9NDL1u8dqTYmMrzcD4mNSws6P6qmeV0%3D; Path=/',
            }),
        })
        const res = await app.request(req)
        expect(res).not.toBeNull()
        expect(res.status).toBe(200)
        expect(await res.json()).toEqual({ message: 'hello world' })
        expect(handlerExecuted).toBeTruthy()
    })
})