import { Context } from "hono"

export type IVars = {
    route: string // url.pathname.tolowercase() 
}

export class Vars implements IVars {

    route: string

    constructor(c: Context) {
        this.route = new URL(c.req.url).pathname.toLowerCase()

    }
}