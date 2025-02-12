import Code from "@/framework/Code.js"
import { Fragment } from "hono/jsx"

const realcode = `
    // some comments
    export const withVars = (handler: Handler) => </pre>{
        return (c: Context) => {
-           const oldFeature = "Removed in this version";
+           const newFeature = "Added in latest version";        
            const v = new Vars(c)
            const v2 = new ••Vers••(c)
            return c.html(handler(v))
        }
    }`

const democode = `<Code language='ts'>{\`
    ${realcode}
\`}</Code>`

const Nuejs = () => {
    return (
        <Fragment>
            <p>Experiments using various bits from <a href='https://nuejs.org'><img width='70px' src='https://nuejs.org/img/logomark-big.png' alt="Nuejs, The Design Engineer Framework" /></a> with Cloudflare, Hono, htmx & picoCSS.</p>
            <article>
                <h4>glow</h4>
                <p>Example typescript code block below with syntax highlighting.</p>
                <p>The following server side <kbd>tsx</kbd> code</p>
                <pre class='honocode' language='html'>{democode}
                </pre>
                <p>Results in;</p>
                <Code language="ts">{realcode}</Code>
                <p><mark>note</mark> : added and deleted line syntax not currently working on my first attempt and needs to be fixed, but happy with how easily I was able to get this far.</p>
            </article>
        </Fragment >

    )
}

export default Nuejs
