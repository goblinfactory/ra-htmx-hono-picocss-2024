import Layout from "@/controls/Layout.js"
import { App } from "@/index.js"

var _cnt = 0

const CommentsPage = () => {

    return (
        <>
            <h2>Comments</h2>
            <ul id="comments-list">
                <li>Great post!</li>
                <li>Very informative, thanks!</li>
            </ul>
            <form hx-post="/comments" hx-target="#comments-list" hx-swap="innerHTML">
                <textarea name="comment" placeholder="Write your comment..."></textarea>
                <button type="submit">Add Comment</button>
            </form>
        </>
    )
}

export const initCommentsPage = (app: App) => {
    app.post("/comments", (c) => c.html(<li> comment : {++_cnt}</li>))
    app.get('/comments', c => c.html(<Layout ctx={c}><CommentsPage /></Layout>))
}