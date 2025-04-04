import { useState } from "react";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { validateCoupon } from "../../redux/slices/couponSlices";
import { toast } from "react-toastify"
import { createNewOrder } from "../../redux/slices/orderSlices";
import { clearOrderedProducts } from "../../redux/slices/cartSlices";
import { PayPalButtons } from "@paypal/react-paypal-js";



const Checkout = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = location.state?.cartItems || [];
    const [errors, setErrors] = useState({});

    const { user } = useSelector((state) => state.user);
    const [shippingDetails, setShippingDetails] = useState({
        fullName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
        email: "",
    });

    // coupon section
    const { loading } = useSelector((state) => state.coupons);
    const [couponCode, setCouponCode] = useState("");
    const [discountedTotal, setDiscountedTotal] = useState(null);
    const [discountAmount, setdiscountAmount] = useState(0);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.07; // Example tax rate of 7%
    // const total = subtotal + tax;

    const totalAmountBeforeDiscount = subtotal + tax;

    const [localTotal, setLocalTotal] = useState(totalAmountBeforeDiscount)

    const handleApplyCoupon = async () => {
        try {
            const result = await dispatch(validateCoupon({ code: couponCode.trim(), totalAmount: localTotal })).unwrap();
            setDiscountedTotal(result.discountedTotal);
            setdiscountAmount(result.discountAmount);
            toast.success(result.message);
        } catch (err) {
            toast.error(err || "Failed to apply coupon");
        }
    };



    const handleChange = (e) => {
        const { id, value } = e.target;

        // Update shipping details state
        setShippingDetails({ ...shippingDetails, [id]: value });

        // Validation rules
        let errorMsg = "";

        switch (id) {
            case "fullName":
                errorMsg = value.trim().length < 3 ? "Full name must be at least 3 characters." : "";
                break;
            case "address":
                errorMsg = value.trim().length < 5 ? "Address must be at least 5 characters." : "";
                break;
            case "city":
                errorMsg = value.trim().length < 2 ? "City name is too short." : "";
                break;
            case "state":
                errorMsg = value.trim().length < 2 ? "State name is too short." : "";
                break;
            case "zipCode":
                errorMsg = !/^\d{5}(-\d{4})?$/.test(value) ? "Invalid ZIP Code format." : "";
                break;
            case "phoneNumber":
                errorMsg = !/^\d{10}$/.test(value) ? "Phone number must be 10 digits." : "";
                break;
            case "email":
                errorMsg = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email format." : "";
                break;
            default:
                errorMsg = "";
        }

        // Update error state
        setErrors({ ...errors, [id]: errorMsg });
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




    const handleOrderCreation = async (paymentResult) => {
        if (
            !shippingDetails.fullName ||
            !shippingDetails.address ||
            !shippingDetails.city ||
            !shippingDetails.state ||
            !shippingDetails.zipCode ||
            !shippingDetails.phoneNumber ||
            !shippingDetails.email
        ) {
            toast.error("Please fill in all shipping details!");
            return;
        }

        const orderData = {
            user: user._id,
            cartItems,
            shippingDetails,
            subtotal,
            tax,
            total: discountedTotal || totalAmountBeforeDiscount,
            discount: discountedTotal,
            discountAmount: totalAmountBeforeDiscount - (discountedTotal || totalAmountBeforeDiscount).toFixed(2),  // Total discount amount
            paymentResult,
            paymentMethod: "Paypal",
        };

        console.log("Order Data Sent to API", orderData);

        try {
            const orderResponse = await dispatch(createNewOrder(orderData)).unwrap();

            await dispatch(clearOrderedProducts({ userId: user._id, orderedItems: cartItems.map((item) => item.productId) }));
            toast.success("Order placed successfully! Redirecting...", { position: "top-right" });

            setTimeout(() => {
                window.scrollTo(0, 0);
                navigate("/orders-success", { state: { orderId: orderResponse._id } });
            }, 2000);
        } catch (error) {
            toast.error(error || "Failed to place order");
        }
    };

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
                                <Grid container spacing={2}>
                                    {["fullName", "address", "city", "state", "zipCode", "phoneNumber", "email"].map((field) => (
                                        <Grid key={field} item xs={field === "email" ? 12 : 6}>
                                            <TextField
                                                fullWidth
                                                label={field}
                                                variant="outlined"
                                                required
                                                id={field}
                                                onChange={handleChange}
                                                error={Boolean(errors[field])} // Show error state
                                                helperText={errors[field]} // Show error message
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
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
                                {cartItems.map((item, index) => (
                                    <div key={`${item.productId}-${index}`} className="cart-product">
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

                                            {item.selectedSize && <p>Size (Top): {item.selectedSize}</p>}
                                            {item.selectedSeamSize && <p>Seam Size (Bottom): {item.selectedSeamSize}</p>}
                                            <p>Colour: {item.selectedColorName}</p>

                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-item">
                                <span>Subtotal:</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            <div className="summary-item">
                                <span>Tax:</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>

                            {discountedTotal && (
                                <div className="total">
                                    <span style={{ color: "green", fontSize: "1rem" }}>Discount (10% off): </span>
                                    <span style={{ color: "red" }}>-${(totalAmountBeforeDiscount - discountedTotal).toFixed(2)}</span>
                                </div>
                            )}

                            <div className="total">
                                <span>Total:</span>
                                <span>${(discountedTotal || totalAmountBeforeDiscount).toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="coupon-section">
                            <div className="coupon-input">
                                <h3>Have a coupon?</h3>
                                <input
                                    type="text"
                                    placeholder="Enter coupon code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    disabled={loading}
                                />
                                <button type="button" onClick={handleApplyCoupon} disabled={loading}>
                                    {loading ? "Applying..." : "Apply"}
                                </button>
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <div className="checkout-btn-container">
                            <PayPalButtons
                                style={{ layout: "vertical" }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: (discountedTotal || totalAmountBeforeDiscount).toFixed(2),
                                                },
                                            },
                                        ],
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        handleOrderCreation(details);
                                    });
                                }}
                                onError={(err) => {
                                    toast.error("PayPal transaction failed!");
                                }}
                            />
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
};

export default Checkout;
