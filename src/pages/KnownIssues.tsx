import Layout from "@/controls/Layout.js"
import { App } from "@/index.js"

const KnownIssuesPage = () => (
    <>
        <h2>Known Issues</h2>
        <p>Known issues with this reference architecture. </p>
        <ol>
            <li>Logging in will change the Nav login and logout links; however, after logging in, sometimes if you navigate to a 'htmx boosted' cached page, sometimes the page includes the cached NAV header, <mark>with an incorrect `login` link.</mark> (needs more testing, I saw this briefly and noted it here.)</li>
        </ol>

        <h4>Reporting issues</h4>
        <p>If you find an issue with this reference architecure and want me to look at it for you, please <a href="https://github.com/goblinfactory/ra-htmx-hono-picocss-2024/issues">report it here</a> and I will get to it as soon as I can.</p>
    </>
)

export const initKnownIssuesPage = (app: App) => {
    app.get('/known-issues', c => c.html(<Layout ctx={c}><KnownIssuesPage /></Layout>))
}

