import { Context } from "hono"
import { IVars, Vars } from "../controls/Vars.js"

type Handler = (v: IVars) => string | Promise<string>

export const withVars = (handler: Handler) => {
    return (c: Context) => {
        const v = new Vars(c)
        return c.html(handler(v))
    }
}