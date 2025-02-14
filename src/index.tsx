import { Hono } from "hono"
import { jsxRenderer } from "hono/jsx-renderer"
import { initHomePage } from "./pages/HomePage.js"
import { initHtmxPage } from "./pages/HtmxPage.js"
import { initJwt } from "./pages/auth/initJwt.js"
import { initAuthLogin } from "./pages/auth/login.js"
import { initPrivatePage } from "./pages/private/PrivatePage.js"
import { initBugsPage } from "./pages/BugsPage.js"
import { initCommentsPage } from "./pages/CommentsPage.js"
import { initInfiniteScrollPage } from "./pages/InfiniteScrollPage.js"
import { initLoggedInPage } from "./pages/LoggedInPage.js"
import { initLoggedOutPage } from "./pages/LoggedOutPage.js"
import { initLoginPage } from "./pages/LoginPage.js"
import { initNuejsPage } from "./pages/NuejsPage.js"
import { initCityPickerControl } from "./controls/CityPicker.js"
import { initAuthLogout } from "./pages/auth/logout.js"
import { initKnownIssuesPage } from "./pages/KnownIssues.js"

export type Bindings = {
    SERVER_SECRET: string
    TEST_UNAME: string
    TEST_PWORD: string
}

export type App = Hono<{ Bindings: Bindings }>
const app = new Hono<{ Bindings: Bindings }>()

// middlewares
app.use('*', jsxRenderer())

// global variables "per request" 
app.use('*', (c, next) => {
    c.set('route', new URL(c.req.url).pathname.toLowerCase())
    return next()
})

initCityPickerControl(app)

initJwt(app)
initAuthLogin(app)
initAuthLogout(app)

initKnownIssuesPage(app)
initHomePage(app)
initHtmxPage(app)
initPrivatePage(app)
initBugsPage(app)
initCommentsPage(app)
initInfiniteScrollPage(app)
initLoggedInPage(app)
initLoggedOutPage(app)
initLoginPage(app)
initNuejsPage(app)

export default app