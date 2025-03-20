import { useState } from "react";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const Checkout = () => {
    const location = useLocation();
    const cartItems = location.state?.cartItems || [];

    const [coupon, setCoupon] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.07;
    const total = couponApplied ? (subtotal + tax) * 0.9 : subtotal + tax;

    const handleApplyCoupon = () => {
        if (coupon.trim().toUpperCase() === "SAVE10") {
            setCouponApplied(true);
        } else {
            alert("Invalid coupon code");
            setCouponApplied(false);
        }
    };


    // const handleApplyCoupon = () => {
    //     if (coupon.trim().toUpperCase() === "SAVE10") {
    //         setCouponApplied(true);
    //     } else {
    //         alert("Invalid coupon code");
    //         setCouponApplied(false);
    //     }
    // };

    const calculateTotal = () => {
        let total = orderSummary.subtotal + orderSummary.shipping + orderSummary.tax;
        if (couponApplied) {
            total = total * 0.9; // 10% discount
        }
        return total.toFixed(2);
    };

    // Accordion state for sections (shipping, payment, faq)
    const [activeSection, setActiveSection] = useState(null);
    const toggleSection = (section) => {
        setActiveSection((prev) => (prev === section ? null : section));
    };

    // Dummy FAQ Data
    const faqData = [
        {
            question: "What is your return policy?",
            answer:
                "We accept returns within 30 days if the product is unused and in its original condition.",
        },
        {
            question: "How do I track my order?",
            answer:
                "Once your order is shipped, you'll receive an email with the tracking details.",
        },
        {
            question: "Do you offer international shipping?",
            answer:
                "Yes, we offer international shipping. Shipping charges and delivery times vary by destination.",
        },
    ];

    return (
        <section className="checkout-pages">
            <h1>Checkout</h1>
            <div className="container">

                {/*  */}
                <div className="checkout-content">
                    {/* Accordion Sections for Shipping, Payment, and FAQ */}
                    <div className="accordion-section">
                        <button
                            className="accordion-header"
                            onClick={() => toggleSection("shipping")}
                        >
                            <span>Shipping Details</span>
                            {activeSection === "shipping" ? (
                                <ArrowDropUp />
                            ) : (
                                <ArrowDropDown />
                            )}
                        </button>
                        {activeSection === "shipping" && (
                            <div className="accordion-content">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="fullName">Full Name</label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            placeholder="Enter your address"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="city">City</label>
                                        <input
                                            type="text"
                                            id="city"
                                            placeholder="Enter your city"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="state">State</label>
                                        <input
                                            type="text"
                                            id="state"
                                            placeholder="Enter your state"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="zip">ZIP Code</label>
                                        <input
                                            type="text"
                                            id="zip"
                                            placeholder="Enter your ZIP code"
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
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>

                    <div className="accordion-section">
                        <button
                            className="accordion-header"
                            onClick={() => toggleSection("payment")}
                        >
                            <span>Payment Information</span>
                            {activeSection === "payment" ? (
                                <ArrowDropUp />
                            ) : (
                                <ArrowDropDown />
                            )}
                        </button>
                        {activeSection === "payment" && (
                            <div className="accordion-content">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="cardNumber">Card Number</label>
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            placeholder="Enter your card number"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cardName">Name on Card</label>
                                        <input
                                            type="text"
                                            id="cardName"
                                            placeholder="Enter the name on your card"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="expiry">Expiry Date</label>
                                        <input
                                            type="text"
                                            id="expiry"
                                            placeholder="MM/YY"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cvv">CVV</label>
                                        <input
                                            type="text"
                                            id="cvv"
                                            placeholder="Enter CVV"
                                            required
                                        />
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>

                    <div className="accordion-section">
                        <button
                            className="accordion-header"
                            onClick={() => toggleSection("faq")}
                        >
                            <span>Frequently Asked Questions</span>
                            {activeSection === "faq" ? (
                                <ArrowDropUp />
                            ) : (
                                <ArrowDropDown />
                            )}
                        </button>
                        {activeSection === "faq" && (
                            <div className="accordion-content faq-content">
                                {faqData.map((faq, index) => (
                                    <div key={index} className="faq-item">
                                        <h4>{faq.question}</h4>
                                        <p>{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Checkout Order Section */}
                <div className="checkout-orders">
                    <div className="order-summarys">
                        <h2>Order Summary</h2>
                        <div className="summary-details">

                            {/* Product List (Cart Items) placed under Order Summary */}
                            <div className="cart-products">
                                {cartItems.map((item) => (
                                    <div key={item.productId} className="cart-product">
                                        <div className="cart-product-image">
                                            <img src={item.imageUrl} alt={item.name} />
                                        </div>
                                        <div className="cart-product-details">
                                            <div className="cart-product-name-price">
                                                <h4>{item.name}</h4>
                                                <h4 className="price">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </h4>
                                            </div>
                                            <p>Qty: <span>{item.quantity}</span></p>
                                            <p>Size: {item.selectedSize}</p>
                                            <p>Color: {item.selectedSeamSize}</p>
                                            <p>colour: <span>{item.colorName}</span></p>


                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-item">
                                <span>Subtotal:</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            {/* <div className="summary-item">
                                <span>Shipping:</span>
                                <span>${orderSummary.shipping.toFixed(2)}</span>
                            </div> */}
                            <div className="summary-item">
                                <span>Tax:</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            {/* {couponApplied && (
                                <div className="summary-item discount">
                                    <span>Discount:</span>
                                    <span>-</span>
                                </div>
                            )} */}
                            {couponApplied && <p>Discount (10% off): -${(subtotal * 0.1).toFixed(2)}</p>}

                            <div className="total">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="coupon-section">
                            <div className="coupon-input">
                                <h3>Have a coupon?</h3>
                                <input
                                    type="text"
                                    placeholder="Enter coupon code"
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                />
                                <button type="button" onClick={handleApplyCoupon}>
                                    Apply
                                </button>
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <div className="checkout-btn-container">
                            <button className="checkout-btn">Place Order</button>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
};

export default Checkout;
