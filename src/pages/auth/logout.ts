import { App } from "@/index.js"
import { deleteCookie } from "hono/cookie"

export const initAuthLogout = (app: App) => {
    app.get('/auth/logout', c => {
        c.var.jwtPayload
        deleteCookie(c, 'token')
        //c.header('HX-Redirect', '/logged-out') <-- THIS DOESNT WORK
        return c.redirect('/logged-out') // <--- DO THIS INSTEAD!
    })
}