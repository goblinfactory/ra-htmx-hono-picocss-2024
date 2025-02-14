import Layout from "@/controls/Layout.js"
import { App } from "@/index.js"
import { jwt } from 'hono/jwt'

const PrivatePage = () => {

    return (
        <>
            <h2>Private</h2>
            <p>Private page secured with login and JWT tokens in cookie.</p>
        </>
    )
}

export const initPrivatePage = (app: App) => {

    app.use('/private/*',
        jwt({
            secret: 'server-1294323-$',  // if you clone this project, please change this value.
            cookie: 'token'
        })
    )

    app.get('/private/home', c => c.html(<Layout ctx={c}><PrivatePage /></Layout>))

}