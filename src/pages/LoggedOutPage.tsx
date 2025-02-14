import Layout from "@/controls/Layout.js"
import { App } from "@/index.js"

const LoggedOutPage = () => (
    <>
        <h1>Logged out</h1>
        <p>You have been logged out. Session cookie has been deleted.</p>
    </>
)

export const initLoggedOutPage = (app: App) => {
    app.get('/logged-out', c => c.html(<Layout ctx={c}><LoggedOutPage /></Layout>))
}

