import { Hono } from "hono"
import { FC, Fragment } from "hono/jsx"
import { getRandomUser, User } from "@/repo/getRandomUser.js"
import { App } from "@/index.js"

console.log('initialising users')
export const _users = Array.from({ length: 2000 }, (_, i) => getRandomUser(i))

export type UsersProps = {}

const loadMore = (filter = '', offset = 0) => {
    console.log(`loadMore ready to be triggered: ${filter}, offset: ${offset}`)
    return (
        <div hx-get={`/users/search?filter=${encodeURIComponent(filter)}&offset=${offset}`}
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

const UserList = ({ filter, offset, limit }: UserListProps) => {
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

const Users: FC<UsersProps> = (props) => {
    return (
        <Fragment>
            <h2>Users</h2>
            <p>User browser with htmx infinite scroll. Start typing anything to search. Includes a small debounce. Observe that the link to this "users" page above is  <i>Non boosted</i>. Which means it wont have a soft transition when navigating via the menu above.</p>
            <label htmlFor="search">Search</label>
            <input
                type="search"
                id="filter"
                name="filter"
                placeholder="Search"
                hx-get="/users/search"
                hx-target="#user-list"
                hx-trigger="keyup changed delay:300ms"
                hx-params="filter"
                autocomplete="off"
            />
            <div
                id="user-list"
            ></div>
        </Fragment>
    )
}

export const initUsers = (app: App) => {
    app.get('/users/search', (c) => {
        const filter = c.req.query('filter') || ''
        const offset = parseInt(c.req.query('offset') || '0', 10)
        const limit = 20 // Number of users per page
        return c.html(<UserList filter={filter} offset={offset} limit={limit} />)
    })

    console.log('Users routes have been initialised.')
}

export default Users
