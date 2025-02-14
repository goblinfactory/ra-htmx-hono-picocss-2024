import 'typed-htmx'

declare module 'hono' {
    interface Env extends Bindings { }
    interface ContextVariableMap {
        // Variables available through c.var
        loggedIn?: boolean
        userEmail?: string
        route: string
    }
}

declare module 'hono/jsx' {
    namespace JSX {
        interface HTMLAttributes extends HtmxAttributes { }
    }
}