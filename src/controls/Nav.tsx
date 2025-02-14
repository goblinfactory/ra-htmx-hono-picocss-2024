import { Fragment, PropsWithChildren } from "hono/jsx"

export type NavProps = {
    loggedIn: boolean
    route: string
}

const active = (currentRoute: string, route: string) => {
    return currentRoute === route ? {
        "aria-current": "page",
        "class": "currentpage"
    } : { "href": route }
}

// #TODO: need to clean up this css, manually included here, quite messy.
const Nav = ({ loggedIn, route }: PropsWithChildren<NavProps>) => {
    const cr = route
    return (
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
                    <li><a hx-boost="true" hx-swap="transition:true swap:200ms" {...active(cr, "/")}>Home</a></li>
                </ul>
                <ul>
                    {/* #todo - refactor out duplication */}
                    <li><a hx-boost="true" hx-swap="transition:true swap:200ms" {...active(cr, "/htmx")}>Htmx</a></li>
                    <li><a hx-boost="true" hx-swap="transition:true swap:200ms" {...active(cr, "/nuejs")}>Nuejs</a></li>
                    <li><a hx-boost="true" hx-swap="transition:true swap:200ms" {...active(cr, "/infinite-scroll")}>Infinite scroll</a></li>
                    <li><a hx-boost="true" hx-swap="transition:true swap:200ms" {...active(cr, "/bugs")}>Bugs</a></li>
                    <li><a hx-boost="true" hx-swap="transition:true swap:200ms" {...active(cr, "/known-issues")}>Known-Issues</a></li>
                    {(!loggedIn) && (<li><a {...active(cr, "/login")}>Login</a></li>)}
                    {(loggedIn) && (<li><a {...active(cr, "/auth/logout")}>Logout</a></li>)}
                    <li><a hx-boost="true" hx-swap="transition:true swap:200ms" {...active(cr, "/private/home")}>[401]Jwt</a></li>
                    <li><a hx-boost="true" hx-swap="transition:true swap:200ms" {...active(cr, "/broken-link")}>[404]</a></li>
                </ul>
            </nav>
        </Fragment>
    )
}
export default Nav