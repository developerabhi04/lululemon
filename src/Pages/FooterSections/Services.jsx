

const Services = () => {
    return (
        <div className="services-page">
            <h1 className="title">Our Services</h1>
            <p className="intro">
                At <strong>YourStore</strong>, we are committed to providing you with the best shopping experience. Here are some of the services we offer to ensure your satisfaction:
            </p>

            <div className="services-grid">
                <div className="service-card">
                    <h2>Order Tracking</h2>
                    <p>
                        Track your orders in real-time. Once your order is shipped, you will receive a tracking link via email.
                    </p>
                    <button>Track Now</button>
                </div>

                <div className="service-card">
                    <h2>Returns & Exchanges</h2>
                    <p>
                        We accept returns within 30 days of purchase. Items must be in original condition.
                    </p>
                    <button>Initiate Return</button>
                </div>

                <div className="service-card">
                    <h2>Customer Support</h2>
                    <p>
                        Our dedicated support team is available 24/7 to assist with any questions or concerns.
                    </p>
                    <button>Contact Us</button>
                </div>

                <div className="service-card">
                    <h2>Secure Payments</h2>
                    <p>
                        We use SSL encryption to ensure all transactions are secure and protected.
                    </p>
                    <button>Learn More</button>
                </div>

                <div className="service-card">
                    <h2>International Shipping</h2>
                    <p>
                        We ship worldwide. Shipping fees may apply based on your location.
                    </p>
                    <button>Check Rates</button>
                </div>

                <div className="service-card">
                    <h2>Gift Wrapping</h2>
                    <p>
                        Make your gifts special with our premium wrapping service.
                    </p>
                    <button>Wrap My Gift</button>
                </div>
            </div>

            <footer className="footer">
                <p>
                    If you have any questions about our services, please {"don't"} hesitate to contact us.
                </p>
                <p>
                    Email: support@yourstore.com | Phone: +1 (800) 123-4567
                </p>
            </footer>
        </div>
    );
};

export default Services;
