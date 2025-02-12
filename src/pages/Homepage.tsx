import { Fragment } from "hono/jsx"

const Homepage = () => {
    return (
        <Fragment>
            <h2>HTMX reference architecture sandbox</h2>
            <p>My <a href='https://alanhemmings.com/posts/about-me'>(Alan's)</a> reference architecture for a dead simple edge worker friendly stack using CF Workers, Hono, Htmx and PicoCSS.</p>
            <p>Please note, this is not meant as a demo or as a tutorial; it's an important (deliberately minimalist) reference architecture.
                This allows me to quickly test htmx features safely in isolation before applying them to my production project.
                The source code also serves as documentation for patterns of how to apply htmx in my projects consistently, and how different problems are addressed.
            </p>
            <p>To make best use of this reference archicture, if you have problems in a production project using htmx, clone the repo for this project, and build the smallest page that tests the HTMX behaviour you're using in production. Typically that is most likely a kind of compound control with some behaviours, get that working as a standalone control in the cloned project. HTMX network requests <mark>inspected using F12 dev tools</mark> are so much cleaner than most other frameworks it should often be easy to identify causes and fixes with a small spike.</p>
            <p>See more <kbd>htmx</kbd> examples at <a href='https://htmx.org/examples/'>htmx.org/examples/</a></p>
        </Fragment>

    )
}

export default Homepage
