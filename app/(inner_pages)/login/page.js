
import SignIn from "../components/signIn";
import AuthProvider from "@/app/providers/authprovider";

export default function LoginPage() {
  return (
    <AuthProvider>
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
    </AuthProvider>

  )
}