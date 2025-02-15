import { useNavigate } from "react-router-dom";
import product1 from "../../assets/LW1DTWS_030722_1.webp"
import product2 from "../../assets/LW1DTWS_030722_1.webp"

const Cart = () => {
    const navigate = useNavigate();
    const checkout = () => {
        navigate("/checkout-user")
    }

    return (
        <section className="cart-page">
            <h1>Your Shopping Cart</h1>
            <div className="cart-container">
                {/* Cart Items Section */}
                <div className="cart-items">
                    {/* Sample Cart Item */}
                    <div className="cart-item">
                        <div className="item-image">
                            <img src={product1} alt="Product" />
                        </div>
                        <div className="item-details">
                            <h3>Product Title</h3>
                            <p className="price">Size: XL</p>
                            <p className="price">Colour: Light Green</p>
                            <p className="price">Price: $49.99</p>
                            <div className="item-quantity">
                                <button className="quantity-btn">-</button>
                                <input type="number" value="1" readOnly />
                                <button className="quantity-btn">+</button>
                            </div>
                        </div>
                        <div className="item-remove">
                            <button>Remove</button>
                        </div>
                    </div>
                    {/* Repeat .cart-item for each product in your cart */}
                    <div className="cart-item">
                        <div className="item-image">
                            <img src={product2} alt="Product" />
                        </div>
                        <div className="item-details">
                            <h3>Another Product</h3>
                            <p className="price">Size: S</p>
                            <p className="price">Colour: Cream Pink</p>
                            <p className="price">Price: $49.99</p>
                           
                            <div className="item-quantity">
                                <button className="quantity-btn">-</button>
                                <input type="number" value="2" readOnly />
                                <button className="quantity-btn">+</button>
                            </div>
                        </div>
                        <div className="item-remove">
                            <button>Remove</button>
                        </div>
                    </div>
                </div>

                {/* Order Summary Section */}
                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-details">
                        <p>
                            <span>Subtotal:</span> <span>$79.98</span>
                        </p>
                        <p>
                            {/* <span>Tax:</span> <span>$8.00</span> */}
                        </p>
                        <p>
                            {/* <span>Total:</span> <span>$87.98</span> */}
                        </p>
                    </div>
                    <button className="checkout-btn" onClick={checkout}>Proceed to Checkout</button>
                </div>
            </div>
        </section>
    );
};

export default Cart;
