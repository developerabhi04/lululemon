import { Button } from "@mui/material";
import { motion } from "framer-motion";
import banner1 from "../../../assets/banner/6.png";
import { FaShippingFast, FaTags, FaShieldAlt } from "react-icons/fa";

const Banner = () => {
    return (
        <section className="banner-section">
            <div className="banner-container">
                {/* 🚀 Left Content Section */}
                <motion.div
                    className="banner-content"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        Discover <span>Trendy Fashion</span> & More
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        Upgrade your wardrobe with exclusive fashion collections, best prices, and fast delivery—curated just for you.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            href="/collection"
                            className="banner-btn"
                            component={motion.button}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            Shop Now
                        </Button>
                    </motion.div>

                    {/* 🔥 Feature Section */}
                    <motion.div
                        className="feature-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        <div className="feature-item">
                            <FaShippingFast className="feature-icon" />
                            <p>Free & Fast Delivery</p>
                        </div>
                        <div className="feature-item">
                            <FaTags className="feature-icon" />
                            <p>Best Prices Guaranteed</p>
                        </div>
                        <div className="feature-item">
                            <FaShieldAlt className="feature-icon" />
                            <p>Secure Payments</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* 🖼️ Right Image Section */}
                <motion.div
                    className="banner-image"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    whileHover={{ scale: 1.05 }}
                >
                    <img src={banner1} alt="Fashion Banner" />
                </motion.div>
            </div>
        </section>
    );
};

export default Banner;
