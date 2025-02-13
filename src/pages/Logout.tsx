import { Context } from "hono"
import { deleteCookie } from "hono/cookie"

export type LogoutProps = {
    c: Context
}

const Logout = ({ c }: LogoutProps) => {
    deleteCookie(c, 'token')
    return (
        <>
            <h1>Logged out</h1>
            <p>You have been logged out. Session cookie has been deleted.</p>
        </>
    )
}

export default Logout