import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { googleLogin, loginUser } from "../../redux/slices/userSlices";



const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
    };

    // Show error toast if login fails
    useEffect(() => {
        if (error) {
            toast.error(error, { position: "top-right" });
        }
    }, [error]);

    // google
    const handleGoogleSignIn = async () => {
        try {
            await dispatch(googleLogin()).unwrap();
            toast.info("Google Login Successful!");
        } catch (error) {
            toast.error(error || "Google Login Failed");
        }
    };


    useEffect(() => {
        if (error) toast.error(error);
        if (user) {
            toast.success("Login Successful! Redirecting...", { position: "top-right" });
            navigate("/");
        }
    }, [error, user, navigate]);




    // On successful login, show toast and redirect to home page
    // useEffect(() => {
    //     if (user) {
    //         toast.success("Login Successful! Redirecting...", { position: "top-right" });
    //         setTimeout(() => {
    //             navigate("/");
    //         }, 2000);
    //     }
    // }, [user, navigate]);

    return (
        <div className="signin-container">
            
            <div className="signin-card">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="signin-btn" disabled={loading}>
                            {loading ? "Signing In..." : "Sign In"}
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
                    <button type="button" className="google-btn" onClick={handleGoogleSignIn} disabled={loading}>
                        <FcGoogle />
                        <span>{loading ? "Signing in..." : "Sign in With Google"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
