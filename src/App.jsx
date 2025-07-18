import { useAuth0 } from "@auth0/auth0-react";
import Path from './component/nav';
import '../src/style/App.css'

function App() {
    const {
        isLoading,
        isAuthenticated,
        error,
        loginWithRedirect: login,
        logout: auth0Logout,
        user
    } = useAuth0();

    const signup = () =>
        login({ authorizationParams: { screen_hint: "signup" } });

    if (isLoading) return <h2>Loading...</h2>;

    return isAuthenticated ? (
        <>
            <Path />
        </>
    ) : (
        <div className="login-container">
            <div className="left-section">
                <h1>Welcome to Our Platform</h1>
                <p>Join us and explore amazing features tailored for you.</p>
            </div>
            <div className="right-section">
                {error && <p className="error">Error: {error.message}</p>}
                <button onClick={signup}>Sign Up</button>
                <button onClick={login}>Log In</button>
            </div>
        </div>
    );
}

export default App;
