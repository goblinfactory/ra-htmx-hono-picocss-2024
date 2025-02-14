// initJwt.js
import { verify } from 'hono/jwt'
import { getCookie } from "hono/cookie"
import { Context } from "hono"
import { App } from "@/index.js"

export const initJwt = (app: App) => {
    app.use('*', async (c: Context<any, any, {}>, next: () => any) => {
        // Skip JWT processing for routes under /private/*
        if (c.req.path.startsWith('/private/')) {
            return next()
        }

        // Check for the token in the cookies
        const token = getCookie(c, "token")
        if (token) {
            try {
                // Verify the token using your server secret.
                // Adjust the verification method if needed based on your library version.
                const payload = await verify(token, c.env.SERVER_SECRET || 'server-1294323-$')
                // Attach the payload to the context
                c.set('jwtPayload', payload)
                c.set('loggedIn', true)
                c.set('userEmail', payload.email as string)
            } catch (error) {
                console.error('JWT verification failed:', error)
                // Optionally clear the invalid token cookie here if desired.
            }
        } else {
            c.set('loggedIn', false)
        }

        return next()
    })

}