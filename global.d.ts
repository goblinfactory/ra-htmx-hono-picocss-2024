import 'typed-htmx'


declare module 'hono' {

    type Bindings = {
        SERVER_SECRET: string
        TEST_UNAME: string
        TEST_PWORD: string
    }

    interface Env {
        // Your environment variables
        Bindings: Bindings
    }

    interface ContextVariableMap {
        // Variables available through c.var
    }

}

declare module 'hono/jsx' {
    namespace JSX {
        interface HTMLAttributes extends HtmxAttributes { }
    }
}