
const Login = () => {

    return (
        <main className="container">
            <form hx-post="/auth/login" hx-ext="form-json">
                <h1>Sign in</h1>
                <p>To test Jwt signing and middleware, login with:</p>
                <ul>
                    <li>Email: <mark>guest@demo.com</mark></li>
                    <li>Password: <mark>demo-8592-45BC</mark></li>
                </ul>
                <input
                    type="email"
                    name="email"
                    placeholder="email address"
                    aria-label="Email"
                    autoComplete="username"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    aria-label="Password"
                    autoComplete="current-password"
                    required
                />
                <fieldset>
                    <label htmlFor="remember">
                        <input type="checkbox" role="switch" id="remember" name="remember" />
                        Remember me (for 2 days)
                    </label>
                </fieldset>
                <button type="submit">
                    Login
                </button>
            </form>
            <p>
                <ul>
                    <li>
                        Try logging in with invalid credentials (anything other than the demo creds above) and observe that HTML displays an error dialog with no coding required. Look at the source code for <mark>/pages/Login.tsx.</mark>
                    </li>
                    <li>
                        Without logging in, observe how clicking <mark>[401]</mark>in the menu above that links to a page secured with Jwt middleware, that you automatically get decent error dialog without any coding.
                    </li>
                    <li>
                        Login here, using correct crentials and see how you can now access the private page linked to from the <mark>[401]</mark> menu nav.
                    </li>
                    <li>
                        <kbd>todo:</kbd> I need to show or hide Login, Logout based on user logged in status in the Nav.
                    </li>
                </ul>
            </p>
        </main>
    )
}

export default Login