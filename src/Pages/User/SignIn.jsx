import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";


const SignIn = () => {
    return (
        <div className="signin-container">
            <div className="signin-card">
                <h2>Sign In</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="signin-btn">
                            Sign In
                        </button>
                    </div>
                    <div className="form-footer">
                        <a href="/forgot-password">Forgot password?</a>
                        <span>|</span>
                        <Link to="/sign-up">Create an account</Link>
                    </div>
                </form>

                {/* Google Sign In Button */}
                <div className="google-signin">
                    <button type="button" className="google-btn">

                        <FcGoogle />
                        <span>Sign in With Google</span>
                        {/* <Google /> */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
