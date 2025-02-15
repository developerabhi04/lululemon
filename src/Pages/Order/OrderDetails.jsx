import { useNavigate } from "react-router-dom";
import product1 from "../../assets/products/LW3IKTS_069005_1.webp";
import product2 from "../../assets/products/LW3IKTS_069005_2.webp";
import { Stepper, Step, StepLabel } from "@mui/material";


const OrderDetails = () => {
    const navigateUrl = useNavigate()
    // Define steps for the tracking system
    const steps = ["Order Placed", "Shipped", "Delivered"];

    // Define the current step index (you can make it dynamic based on the order status)
    const currentStep = 2; // 0: Order Placed, 1: Shipped, 2: Delivered

    const navigateLink = () => {
        window.scrollTo(0, 0)
        navigateUrl("/product-details");
    };
    return (
        <section className="order-details-page">
            <div className="container">
                {/* Page Header */}
                <header className="order-header">
                    <h1>Order Details</h1>
                    <p>Track and view detailed information about your order below.</p>
                </header>

                {/* Order Overview */}
                <div className="order-overview">
                    <div className="overview-item">
                        <h3>Order #12345</h3>
                        <p>Placed on: January 12, 2025</p>
                        <p>Status: <span className="status delivered">Delivered</span></p>
                    </div>
                    <div className="overview-item">
                        <p><strong>Total Price:</strong> $199.99</p>
                        <p><strong>Payment Method:</strong> Credit Card</p>
                        <p><strong>Coupon Discount:</strong> $20</p>
                        <p><strong>Tax:</strong> $15</p>
                    </div>
                </div>

                {/* Tracking */}
                <div className="order-tracking">
                    <h2>Order Tracking</h2>
                    <Stepper activeStep={currentStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>

                {/* Product Details */}
                <div className="product-details">
                    <h2>Products</h2>
                    <div className="product-list">
                        <div className="product-item">
                            <div className="product-image" onClick={navigateLink}>
                                <img
                                    src={product1}
                                    alt="Product"
                                />
                            </div>
                            <div className="product-info">
                                <h5>{"Women's T-Shirt"}</h5>
                                <p>Size: M</p>
                                <p>Quantity: 1</p>
                                <p>Price: $49.99</p>
                            </div>
                        </div>

                        <div className="product-item">
                            <div className="product-image">
                                <img
                                    src={product2}
                                    alt="Product"
                                />
                            </div>
                            <div className="product-info">
                                <h5>{"Women's Jeans"}</h5>
                                <p>Size: 32</p>
                                <p>Quantity: 1</p>
                                <p>Price: $149.99</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Details */}
                <div className="payment-details">
                    <h2>Payment Summary</h2>
                    <div className="summary-item">
                        <p>Subtotal:</p>
                        <p>$199.99</p>
                    </div>
                    <div className="summary-item">
                        <p>Coupon Discount:</p>
                        <p>-$20</p>
                    </div>
                    <div className="summary-item">
                        <p>Tax:</p>
                        <p>$15</p>
                    </div>
                    <div className="summary-item total">
                        <p><strong>Total:</strong></p>
                        <p><strong>$194.99</strong></p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                    <button className="cancel-order">Cancel Order</button>
                    <button className="contact-support">Contact Support</button>
                </div>
            </div>
        </section>
    );
};

export default OrderDetails;
