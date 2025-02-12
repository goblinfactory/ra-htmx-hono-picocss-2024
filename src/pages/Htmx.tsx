import { Hono } from "hono"
import type { PropsWithChildren } from 'hono/jsx'
import { Fragment } from 'hono/jsx'
import CityPicker from '@/controls/CityPicker.js'
import { _users } from "@/pages/Users.js"
import { App } from "@/index.js"

var cnt = 0
const getTitle = () => `test hx-swap :${cnt}`

const HtmxPage = () => {

    return (
        <Fragment>
            <h2>HTMX</h2>
            <p>Minimal HTMX sandboxes, with clean UX using PicoCSS here. Larger sandboxes, like user search, or implementing infinite scroll with HTMX get their own link at the top of the page. <mark>Open F12 dev tools and watch the clean simple requests.</mark> Observe that requests to 'htmx'` and `Comments` and `Bugs` generate a SINGLE http request, wheras `infinite scroll (non-boosted)` is a full reload of 5 requests. This is <mark>amazingly clean</mark>, <i>ridiculously simple</i> together with a superbly low learning curve.</p>
            <p>See more examples at <a href='https://htmx.org/examples/'>htmx.org/examples/</a></p>
            <article>
                <p>Clicking button below should swap the page title when the response arrives...</p>
                <a href='#' hx-post="/htmx/new-title" hx-trigger="click" hx-target="#sometext">change text & title</a>
                <div id='sometext' />
            </article>

            <article>
                <p>Some text with <span id='clickme' hx-trigger="click[shiftKey]" hx-target="#clickme" hx-post='/htmx/shift-click'><mark>shift-click me</mark></span>, and some other text.</p>
            </article>
            <article>
                <h3>Mouse enter and leave <span id='entercnt'></span></h3>
                <textarea hx-post="/htmx/mouse-enter" hx-trigger="mouseenter" hx-target="#entercnt" placeholder="mouse over here">
                </textarea>
                Enter tracked only once : <span id='enteronce'></span>
                <input type='text' hx-post="/htmx/enter-once" hx-trigger="mouseenter once" hx-target="#enteronce">
                </input>
                Track changed : <span id='trackchange'></span>
                <input type='text' hx-post="/htmx/track-change" hx-trigger="change" hx-target="#trackchange">
                </input>

            </article>
            <article>
                <h3>Button and links <span id='oobtitle1'></span></h3>
                <p>Throttle will not allow you to make more than 1 request per (throttled) seconds.</p>
                <section>
                    <HtmxButton>{getTitle()}</HtmxButton>&nbsp;
                </section>
                <section>
                    <button hx-post="/htmx/inc-seconds" hx-target="#seconds0">delay 0 sec <span id='seconds0'></span></button>&nbsp;
                    <button hx-post="/htmx/inc-seconds" hx-trigger="click delay:1000ms" hx-target="#seconds1">delay 1 sec <span id='seconds1'></span></button>&nbsp;
                    <button hx-post="/htmx/inc-seconds" hx-trigger="click" hx-target="this">(this) delay 0 sec <span id='seconds1'></span></button>&nbsp;
                </section>
                <section>
                    <button hx-post="/htmx/inc-throttle" hx-trigger="click throttle:2000ms" hx-target="#throttle2">throttle 2 sec <span id='throttle2'></span></button>&nbsp;
                    <button hx-post="/htmx/inc-throttle" hx-trigger="click throttle:5000ms" hx-target="#throttle5">throttle 5 sec <span id='throttle5'></span></button>&nbsp;
                </section>
            </article>
            <article>
                <h3>Out of band swap <span id='oobtitle1'></span></h3>
                <p>Allow you to update multiple things at the same time.</p>
                <form hx-post="/htmx/oob/post">
                    <input id="oobtext" name="oobtext" type="text" placeholder="enter text" />
                    <button type="submit">submit</button>
                </form>
            </article>
            <article>
                <CityPicker />
            </article>
            <article>
                <h3>Tables</h3>
                <table class='striped'>
                    <thead>
                        <tr><td>field</td><td>value</td></tr>
                    </thead>
                    <tbody id='tbody1'>
                        <tr id='rowFred'><td>name</td><td><a href='#' hx-post="/htmx/tables/fred" hx-target="#tbody1" hx-trigger='click once'>Fred</a></td></tr>
                        <tr><td>Age</td><td>-</td></tr>
                        <tr><td>Department</td><td>-</td></tr>
                    </tbody>
                </table>
            </article>
            <article>
                <h3>Out of band Table Update</h3>
                <p>Demonstrates using out of band to update two tables from a single response.</p>
                <form hx-post='/htmx/tables/add-users' hx-swap="none">
                    <fieldset role="group">
                        <input type='number' id='number' name='cnt' required min={1} max={20} placeholder="number of users"></input><button type="submit">load</button>
                    </fieldset>
                </form>
                <table class='striped'>
                    <thead>
                        <tr><td>ID</td><td>Name</td><td>City</td></tr>
                    </thead>
                    <tbody id='tbody2'>
                    </tbody>
                </table>

                <table class='striped'>
                    <thead>
                        <tr><td>ID</td><td>Name</td><td>City</td></tr>
                    </thead>
                    <tbody id='tbody3'>
                        <tr><td>-</td><td>-</td><td>-</td></tr>
                    </tbody>
                </table>
            </article>

            <article>
                <h3>Better SEO urls</h3>
                <p>To get better urls use <a href='https://unpkg.com/htmx-ext-path-params@2.0.0/path-params.js'>unpkg.com/htmx-ext-path-params@2.0.0/path-params.js</a></p>
            </article>
        </Fragment>
    )
}

const HtmxButton = ({ children }: PropsWithChildren) => {
    return (
        <button
            hx-post="/htmx/click-button"
            hx-swap="outerHTML"
        >{children}</button>
    )
}

const HtmxLink = ({ children }: PropsWithChildren) => {
    return (
        <a href="/click-link"
            hx-post="/htmx/click-link"
            hx-target-="#parent-div"
            hx-swap="outerHTML"
        >{children}</a>
    )
}

var _changed = 0
var _throttle = 0
var _seconds = 0

export const initHtmxPage = (app: App) => {
    app.post('/htmx/click-button', (c) => { cnt++; return c.html(<HtmxLink>{getTitle()}</HtmxLink>) })
    app.post('/htmx/click-link', (c) => { cnt++; return c.html(<HtmxButton>{getTitle()}</HtmxButton>) })
    app.post('/htmx/mouse-enter', (c) => { cnt++; return c.html(<>{cnt}</>) })
    app.post('/htmx/enter-once', (c) => { cnt++; return c.html(<strong>(entered)</strong>) })
    app.post('/htmx/track-change', (c) => { _changed++; return c.html(<strong>({_changed})</strong>) })
    app.post('/htmx/inc-seconds', (c) => { _seconds++; return c.html(<kbd>({_seconds})</kbd>) })
    app.post('/htmx/inc-throttle', (c) => { _throttle++; return c.html(<kbd>({_throttle})</kbd>) })
    app.post('/htmx/shift-click', (c) => { return c.html(<>do not click me</>) })
    app.post('/htmx/new-title', (c) => { return c.html(<><title>this ({++cnt}) is the new title!</title>Did the title change?</>) })
    app.post('/htmx/oob/post', async (c) => {
        const form = await c.req.parseBody()
        const text = (form.oobtext || '') as string
        return c.html(<div>
            <span id='oobtitle1' hx-swap-oob="true"> ({text.length} chars.)</span>
            <p>Thank you for your submission!</p>
        </div>)
    })
    app.post('/htmx/tables/fred', (c) => c.html(
        <>
            <tr><td>Name</td><td>Fred</td></tr>
            <tr><td>Age</td><td>21</td></tr>
            <tr><td>Department</td><td>Sales</td></tr>
        </>
    ))

    // interstingly the ID used below MUST NOT include a # prefix!
    app.post('/htmx/tables/add-users', async (c) => {
        const form = await c.req.parseBody()
        const cnt = form.cnt as any as number
        // in case it gets hacked
        if (cnt < 1 || cnt > 20) return c.html("<h2>hey, you can have this boom! we dont want it.</h2>")
        const users1 = _users.slice(0, cnt)
        const users2 = _users.slice(cnt, cnt * 2)
        return c.html(
            <>
                <tbody id='tbody2' hx-swap-oob="true" hx-swap="outerHTML">
                    {users1.map(u => <tr><td>{u.id}</td><td>{u.fullName}</td><td>{u.city}</td></tr>)}
                </tbody>
                <tbody id='tbody3' hx-swap-oob="true" hx-swap="outerHTML">
                    {users2.map(u => <tr><td>{u.id}</td><td>{u.fullName}</td><td>{u.city}</td></tr>)}
                </tbody>
            </>
        )
    })
    console.log('Htmx routes have been initialised.')
}

export default HtmxPage