import { useAuth0 } from "@auth0/auth0-react";
import Path from './component/nav'
function App () {
    const{ isLoading, isAuthenticated, error, loginWithRedirect: login, logout: auth0Logout, user } = useAuth0();
    const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });
    const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

    if (isLoading)  <h2>Heloo</h2>

    return isAuthenticated ? (
        <>
            {/*  */}
            <pre><Path/></pre>
        </>
    ) : (
        <>
            {error && <p>Error: {error.message}</p>}
            <button style={{justifyContent:"center"}} onClick={signup}>Sign Up</button>
            <button onClick={login}>Log In</button>
        </>
    );
}
export default App;