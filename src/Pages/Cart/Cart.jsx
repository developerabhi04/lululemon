import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import { deleteCartItem, fetchCartItems, updateCartQuantity } from "../../redux/slices/cartSlices";
import { toast } from "react-toastify";
import { Delete, RemoveShoppingCart } from "@mui/icons-material";
import { Typography } from "@mui/material";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { cartItems = [] } = useSelector((state) => state.shopCart);

    useEffect(() => {
        if (user) {
            dispatch(fetchCartItems(user._id))
        }
    }, [dispatch, user]);



    // Handle quantity change for a cart item
    const handleQuantityChange = (productId, sizes, seamSizes, newQuantity) => {
        if (newQuantity < 1) {
            toast.error("Quantity must be at least 1");
            return;
        }

        dispatch(updateCartQuantity({ userId: user._id, productId, quantity: newQuantity, sizes, seamSizes }))
            .unwrap()
            .then(() => {
                // toast.success("Cart item quantity updated successfully!");
                dispatch(fetchCartItems(user._id)); // Fetch cart items after update success
            })
            .catch((error) => toast.error(error));
    };



    // Handle removing an item from the cart
    const handleRemoveItem = (productId, sizes, seamSizes) => {
        console.log("Attempting to delete:", { productId, sizes, seamSizes }); // DEBUG!

        if (!productId || !sizes || !seamSizes) {
            console.warn("Missing productId, sizes, or seamSizes!");
            return; // Or handle the error appropriately
        }

        dispatch(deleteCartItem({ userId: user._id, productId, sizes, seamSizes }))
            .unwrap()
            .then(() => toast.success("Item removed from cart successfully!"))
            .catch((error) => toast.error(error));
    };


    const checkout = () => {
        navigate("/checkout-user", { state: { cartItems } });
    };

    // Calculate subtotal, tax, and total
    const subtotal = cartItems.reduce((acc, item) => (item.price ? acc + item.price * item.quantity : acc), 0);
    const tax = subtotal * 0.07; // Assuming a tax rate of 7%
    const total = subtotal + tax;

    // if (isLoading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error}</p>;

    console.log("Cart Items in Component:", cartItems);

    return (

        <Fragment>
            <section className="cart-page">
                {cartItems.length === 0 ? (

                    <div className="emptyCart">
                        <RemoveShoppingCart />
                        <Typography>No Product in Your Cart</Typography>
                        <Link to="/products">View Products</Link>
                    </div>
                ) : (
                    <div className="cart-container">
                        <h1 className="cart-heading">Your Shopping Cart ({cartItems.length} Items)</h1>

                        <div className="cart-content">
                            {/* Cart Items Section */}
                            <div className="cart-items">

                                {cartItems.map((item, index) => (
                                    <div className="cart-item" key={`${item.productId}-${String(item.selectedSize) || 'noSize'}-${String(item.selectedSeamSize) || 'noSeamSize'}-${index}`}>
                                        <div className="item-image">
                                            <img src={item.imageUrl} alt={item.name} />
                                        </div>
                                        <div className="item-info">
                                            <div className="item-details">

                                                <div className="item-controls">
                                                    <h3 className="item-title">{item.name}</h3>

                                                    <button className="remove-btn">
                                                        <Delete onClick={() => handleRemoveItem(item.productId, item.selectedSize, item.selectedSeamSize)} />
                                                    </button>
                                                </div>

                                                <div className="quantity-control">

                                                    <div className="quantity-buttons">
                                                        <button className="quantity-btn"
                                                            onClick={() => handleQuantityChange(item.productId, item.selectedSize, item.selectedSeamSize, item.quantity - 1)}>
                                                            −
                                                        </button>

                                                        <input type="number" value={item.quantity} readOnly />
                                                        <button className="quantity-btn" onClick={() => handleQuantityChange(item.productId, item.selectedSize, item.selectedSeamSize, item.quantity + 1)}>+</button>
                                                    </div>

                                                    <p className="item-price">${item.price || 0}</p>
                                                </div>
                                                {/* <p className="item-price">${item.price}</p> */}
                                                {/* <p>Available Sizes: {item.sizeOptions && item.sizeOptions.join(', ')}</p> */}
                                                {/* <p>Available Seam Sizes: {item.seamSizeOptions && item.seamSizeOptions.join(', ')}</p> */}

                                                <p className="item-variant">Size: {item.selectedSize}</p>
                                                <p className="item-variant">SeamSize: {item.selectedSeamSize}</p>
                                                <p className="item-variant">Color: {item.selectedColorName}</p>

                                            </div>

                                        </div>
                                    </div>

                                ))}




                            </div>
                            {/* Order Summary Section */}
                            <div className="order-summary">
                                <h2 className="summary-heading">Order Summary</h2>
                                <div className="summary-details">
                                    <div className="summary-row">
                                        <span>Subtotal ({cartItems.length} Items)</span>
                                        <span>$({subtotal.toFixed(2)})</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Shipping</span>
                                        <span className="free-shipping">FREE</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Estimated Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="summary-total">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button className="checkout-btn" onClick={checkout}>
                                    Proceed to Checkout
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                        <path d="M17 12h-4v4h-2v-4H7v-2h4V6h2v4h4z" />
                                    </svg>
                                </button>
                                <div className="secure-checkout">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                                    </svg>
                                    <span>Secure SSL Encryption</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </Fragment>

    )
}

export default Cart;





