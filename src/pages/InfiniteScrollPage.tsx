import { Fragment } from "hono/jsx"
import { getRandomUser } from "@/repo/getRandomUser.js"
import { App } from "@/index.js"
import Layout from "@/controls/Layout.js"

console.log('initialising users')
export const _users = Array.from({ length: 2000 }, (_, i) => getRandomUser(i))

export type UsersProps = {}

const loadMore = (filter = '', offset = 0) => {
    console.log(`loadMore ready to be triggered: ${filter}, offset: ${offset}`)
    return (
        <div hx-get={`/infinite-scroll/search?filter=${encodeURIComponent(filter)}&offset=${offset}`}
            hx-target="#user-list"
            hx-trigger="revealed"
            hx-swap="beforeend">
            <p><mark>Loading more users...</mark></p>
        </div>
    )
}

type UserListProps = {
    filter: string
    offset: number
    limit: number
}

const InfiniteScrollPage = ({ filter, offset, limit }: UserListProps) => {
    const filteredUsers = _users
        .filter(user => user.fullName.toLowerCase().includes(filter.toLowerCase()))
        .slice(offset, offset + limit)
        .map(user => (
            <Fragment key={'' + user.id}>
                <details>
                    <summary><mark>{user.id}</mark> {user.fullName}</summary>
                    <article>
                        {user.firstName} is from <mark>{user.city}</mark>
                    </article>
                </details>
                <hr />
            </Fragment>
        ))

    const hasMore = (_users.filter(user => user.fullName.toLowerCase().includes(filter.toLowerCase())).length > offset + limit)

    return (
        <>
            {filteredUsers}
            {hasMore && loadMore(filter, offset + limit)}
        </>
    )
}

const Users = () => {
    return (
        <>
            <h2>Users</h2>
            <p>User browser with htmx infinite scroll. Start typing anything to search. Includes a small debounce. Open F12, and observe the network requests, then scroll down and see additional requests per "page" of "more" information. Observe no other housekeeping requests. Extremely clean.</p>
            <label htmlFor="search">Search</label>
            <input
                type="search"
                id="filter"
                name="filter"
                placeholder="Search"
                hx-get="/infinite-scroll/search"
                hx-target="#user-list"
                hx-trigger="keyup changed delay:300ms"
                hx-params="filter"
                autocomplete="off"
            />
            <div
                id="user-list"
            ></div>
        </>
    )
}

export const initInfiniteScrollPage = (app: App) => {
    app.get('/infinite-scroll', c => c.html(<Layout ctx={c}><Users /></Layout>))
    app.get('/infinite-scroll/search', (c) => {
        const filter = c.req.query('filter') || ''
        const offset = parseInt(c.req.query('offset') || '0', 10)
        const limit = 20 // Number of users per page
        return c.html(<InfiniteScrollPage filter={filter} offset={offset} limit={limit} />)
    })
}