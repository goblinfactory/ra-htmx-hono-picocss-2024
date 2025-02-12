import { App } from "@/index.js"
import { FC, Fragment } from "hono/jsx"

export type CommentsProps = {

}

var _cnt = 0

export const initComments = (app: App) => {
    app.post("/add-comment", (c) => c.html(<li> comment : {++_cnt}</li>))
    console.log('Comments routes have been initialised.')
}

const Comments: FC<CommentsProps> = (props) => {

    return (
        <Fragment>
            <h2>Comments</h2>
            <ul id="comments-list">
                <li>Great post!</li>
                <li>Very informative, thanks!</li>
            </ul>
            <form hx-post="/add-comment" hx-target="#comments-list" hx-swap="innerHTML">
                <textarea name="comment" placeholder="Write your comment..."></textarea>
                <button type="submit">Add Comment</button>
            </form>
        </Fragment>
    )
}

export default Comments