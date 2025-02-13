import { Hono } from "hono"
import { FC, Fragment } from "hono/jsx"

export type CommentsProps = {

}

var _cnt = 0

export const initComments = (app: Hono) => {
    app.post("/add-comment", (c) => c.html(<li> comment : {++_cnt}</li>))
    console.log('Comments routes have been initialised.')
}

const Private: FC<CommentsProps> = (props) => {

    return (
        <Fragment>
            <h2>Private</h2>
            <p>Private page secured with login and JWT tokens in cookie.</p>
        </Fragment>
    )
}

export default Private