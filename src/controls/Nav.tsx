import { Fragment, PropsWithChildren } from "hono/jsx"
import { IVars } from "./Vars.js"

export type NavProps = {
    vars: IVars
    targetID: string // target CSS id of the element for any hotswaps
}

const active = (v: IVars, route: string) => {
    return v.route === route ? {
        "aria-current": "page",
        "class": "currentpage"
    } : { "href": route }
}

const Nav = ({ vars, targetID }: PropsWithChildren<NavProps>) => (
    <Fragment>
        <style>{`
            #mainsection {
                transition: all 2s ease-in-out;
            }

            #mainsection.htmx-settling {
                opacity: 0;
            }

            #mainsection.htmx-swapping {
                opacity: 1;
            }

            dialog header {
            position: relative;
            }

            dialog header .close {
            position: absolute;
            top: 0.5em;
            right: 0.5em;
            font-size: 1.5rem;
            cursor: pointer;
            z-index:10;
            }            
            `}
        </style>
        <nav>
            <ul>
                <li><a hx-boost="true" hx-swap="transition:true swap:200ms" {...active(vars, "/")}>Home</a></li>
            </ul>
            <ul>
                {/* <li><a hx-boost="true" hx-swap="transition:true swap:200ms" {...active(vars, "/login")}>login</a></li> */}
                <li><a hx-boost="true" hx-swap="transition:true swap:200ms" {...active(vars, "/htmx")}>Htmx</a></li>
                <li><a hx-boost="true" hx-swap="transition:true swap:200ms" {...active(vars, "/nuejs")}>Nuejs</a></li>
                <li><a {...active(vars, "/users")}>Infinite scroll</a></li>
                <li><a hx-boost="true" hx-swap="transition:true swap:200ms" {...active(vars, "/bugs")}>Bugs</a></li>
                <li><a hx-boost="true" hx-swap="transition:true swap:200ms" {...active(vars, "/login")}>Login</a></li>
                <li><a hx-boost="true" hx-swap="transition:true swap:200ms" {...active(vars, "/private/home")}>[401]Jwt</a></li>
                <li><a hx-boost="true" hx-swap="transition:true swap:200ms" {...active(vars, "/broken-link")}>[404]</a></li>
            </ul>
        </nav>
    </Fragment>
)

export default Nav