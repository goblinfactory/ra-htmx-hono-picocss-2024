import { PropsWithChildren } from "hono/jsx"
import Nav from './Nav.js'
import { IVars } from "./Vars.js"
import HtmxError from "./HtmxError.js"


export type LayoutProps = {
    vars: IVars
}

const Layout = ({ vars, children }: PropsWithChildren<LayoutProps>) => {
    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>htmx reference architecture</title>
                <script src="https://unpkg.com/htmx.org@2.0.4" integrity="sha384-HGfztofotfshcF7+8n44JQL2oJmowVChPTg48S+jvZoztPfvwD79OC/LTtG6dMp+" crossorigin="anonymous"></script>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" />
            </head>
            <body>
                <style>{`
        header { padding:2em; background-color:whitesmoke;border-bottom:1px solid gainsboro; }
        h1{ color: #005EB8;}
        .narrow { max-width:50%; min-width:400px; }
        mark { border-radius:0.4em; }
        a.currentpage { font-weight:bolder; text-decoration:none; }
        .honocode { background-color:#aaa3; color: rgb(36, 41, 46);  }
        pre { padding-bottom:0px; }
        @media (prefers-color-scheme: dark) {
            .honocode {
                background-color: #3333;
                color: rgb(156,156,156);
            }
        }        
        `}</style>

                <header>
                    <h1>CF Worker, Hono, Htmx, picoCSS</h1>
                </header>
                <main class='container'>
                    <Nav targetID="#mainsection" vars={vars} />
                    <HtmxError />
                    <section id='mainsection'>
                        {children}
                    </section>
                </main>
            </body>
        </html>
    )
}

export default Layout