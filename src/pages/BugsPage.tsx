import Layout from "@/controls/Layout.js"
import { App } from "@/index.js"

const BugsPage = () => (
    <>
        <h2>Bugs</h2>
        <p>All the htmx stuff that did not work straight out the box. <i>Needs further investigating.</i></p>
        <article>
            <h3>hx-sync</h3>
            <mark>Nothing happens, hx-sync does not stop both requests from happening.</mark>
            <p><a href="https://htmx.org/docs/#synchronization">Without using hx-sync</a></p>
            <p>Filling out the input and immediately submitting the form below triggers two parallel requests to <kbd>/htmx/hx-sync/store</kbd> and <kbd>/htmx/hx-sync/validate</kbd>.</p>
            <form hx-post="/htmx/hx-sync/store">
                <input id="title" name="title" type="text"
                    hx-post="/htmx/hx-sync/validate1"
                    hx-trigger="change" />
                <button type="submit">Submit</button>
            </form>
            <p>Using <kbd>hx-sync="closest form:abort"</kbd> below and we resolve the synchronisation declaratively. (Open F12 devtools to see the difference between the form above and below.)</p>
            <form hx-post="/htmx/hx-sync/store">
                <input id="title2" name="title2" type="text"
                    hx-post="/htmx/hx-sync/validate2"
                    hx-trigger="change"
                    hx-sync="closest form:abort"
                />
                <button type="submit">Submit</button>
            </form>
        </article>
    </>
)

export const initBugsPage = (app: App) => {
    app.get('/bugs', c => c.html(<Layout ctx={c}><BugsPage /></Layout>))
}
