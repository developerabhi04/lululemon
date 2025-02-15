import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";


const SignUp = () => {
    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2>Create Account</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="fullname">Full Name</label>
                        <input
                            type="text"
                            id="fullname"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
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
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            placeholder="Enter your phone number"
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
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="signup-btn">Sign Up</button>
                    </div>
                    <div className="form-footer">
                        <p>
                            Already have an account? <Link to="/sign-in">Sign In</Link>
                        </p>
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

export default SignUp;
