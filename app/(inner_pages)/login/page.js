
import SignIn from "../components/signIn";

export default function LoginPage() {
  return (
    <div className="main-container">
      <div className="login-form">
        <div className="login-section">
          <div className="container">
            <div className="login-box">
              <h2>Login</h2>
              <SignIn />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}