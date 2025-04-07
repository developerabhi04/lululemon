import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlistItems, moveToCart, removeFromWishlist } from "../../redux/slices/wishlistSlices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { wishlistItems, isLoading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (user) {
      dispatch(fetchWishlistItems(user._id));
    }
  }, [dispatch, user]);
  

  const handleRemoveFromWishlist = async (productId, sizes, seamSizes, colorName) => {
    try {
      await dispatch(removeFromWishlist({ userId: user._id, productId, sizes, seamSizes, colorName })).unwrap();
      toast.success("Item removed from wishlist!");
      // dispatch(fetchWishlistItems(user._id));
    } catch (error) {
      toast.error(error?.message || "Failed to remove item from wishlist");
    }
  };



  const handleMoveToCart = async (item) => {
    if (!user) {
      toast.error("Please log in to move items to your cart.");
      return;
    }

    const payload = {
      userId: user._id,
      productId: item.productId,
      sizes: item.selectedSize || null,
      seamSizes: item.selectedSeamSize || null,
      colorName: item.selectedColorName,
    };
    try {
      await dispatch(moveToCart(payload)).unwrap();

      toast.success("Item moved to cart successfully!");
    } catch (error) {
      console.error("❌ Move to Cart Error:", error);
      toast.error(error?.message || "Failed to move item to cart.");
    }
  };



  if (isLoading) return <p>Loading wishlist...</p>;
  if (error) return <p>Error loading wishlist: {error}</p>;



  const navigateLink = (id) => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
    navigate(`/product-details/${id}`);
  }

  return (
    <section className="wishlist-page">
      <div className="container">
        <h1 className="page-heading">My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <p>Your wishlist is empty. Start adding your favorite products!</p>
            <button className="shop-now" onClick={() => navigate("/products")}>Shop Now</button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div className="wishlist-card" key={`${item.productId}-${item.selectedSize || 'noSize'}-${item.selectedSeamSize || 'noSeamSize'}-${item.selectedColorName}`} >
                <div className="wishlist-image" onClick={() => navigateLink(item.productId)}>
                  <img src={item.imageUrl} alt={item.name} />
                </div>
                <div className="wishlist-details">
                  <h3>{item.name}</h3>

             
                  {item.selectedSize && <p className="item-variant">Size (Top): {item.selectedSize}</p>}
                  {item.selectedSeamSize && <p className="item-variant">Seam Size (Bottom): {item.selectedSeamSize}</p>}
                  <p className="price">${item.price}.00</p>

                  <div className="wishlist-actions">
                    <button className="move-to-cart" onClick={() => handleMoveToCart(item)}>
                      Move to Cart
                    </button>

                    <button className="remove-item"
                      onClick={() => handleRemoveFromWishlist(item.productId, item.selectedSize, item.selectedSeamSize, item.selectedColorName)}
                    >Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
