import Layout from "@/controls/Layout.js"
import { App } from "@/index.js"

const LoggedInPage = () => (
    <>
        <h2>Logged in</h2>
        <p>You have succesfully logged in.</p>
    </>
)

export const initLoggedInPage = (app: App) => {
    app.get('/logged-in', c => c.html(<Layout ctx={c}><LoggedInPage /></Layout>))
}

