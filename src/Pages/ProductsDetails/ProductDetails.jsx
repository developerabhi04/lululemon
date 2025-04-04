import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { Add, FavoriteBorder, Remove } from "@mui/icons-material";
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSimilarProducts, fetchSingleProduct } from "../../redux/slices/productSlices";
import { addToCart } from "../../redux/slices/cartSlices";
import { toast } from "react-toastify";
import { addToWishlist } from "../../redux/slices/wishlistSlices";
import SimilarProduct from "./SimilarProduct";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.user);
  const { product, loading, error } = useSelector((state) => state.products);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  // Set default selection and fetch similar products once product loads
  useEffect(() => {
    if (product && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0].colorName);
      setSelectedSize(null);
      setSelectedThumbnail(0);
      dispatch(fetchSimilarProducts(product._id));
    }
  }, [product, dispatch]);

  // Read query parameter "selectedImage" to update selection if provided
  useEffect(() => {
    if (product && product.colors && product.colors.length > 0) {
      const params = new URLSearchParams(location.search);
      const selectedImageUrl = params.get("selectedImage");
      if (selectedImageUrl) {
        let found = false;
        product.colors.forEach((color) => {
          if (color.photos && color.photos.length > 0) {
            const index = color.photos.findIndex((photo) => photo.url === selectedImageUrl);
            if (index !== -1) {
              setSelectedColor(color.colorName);
              setSelectedThumbnail(index);
              found = true;
            }
          }
        });
        if (!found) {
          setSelectedColor(product.colors[0].colorName);
          setSelectedThumbnail(0);
        }
      }
    }
  }, [location.search, product]);

  const selectedVariant = product?.colors?.find((c) => c.colorName === selectedColor);
  const mainImageUrl =
    selectedVariant && selectedVariant.photos && selectedVariant.photos.length > 0
      ? selectedVariant.photos[selectedThumbnail]?.url
      : product?.colors?.[0]?.photos?.[0]?.url || "https://via.placeholder.com/500";

  const showSizes = selectedVariant?.sizes && selectedVariant.sizes.length > 0;
  const showSeamSizes = !showSizes && selectedVariant?.seamSizes && selectedVariant.seamSizes.length > 0;

  let currentStock = null;
  if (selectedVariant && selectedSize) {
    if (showSizes) {
      const sizeObj = selectedVariant.sizes.find((s) => s.size === selectedSize);
      currentStock = sizeObj ? sizeObj.stock : 0;
    } else if (showSeamSizes) {
      const seamObj = selectedVariant.seamSizes.find(
        (s) => s.seamSize.toString() === selectedSize.toString()
      );
      currentStock = seamObj ? seamObj.stock : 0;
    }
  }

  const buttonLabel = selectedSize
    ? currentStock > 0
      ? "Add to Cart"
      : "Out of Stock"
    : "Select Size";
  const buttonDisabled = !selectedSize || currentStock === 0;

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color before adding to cart.");
      return;
    }
    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }
    const payload = {
      userId: user._id,
      productId: product._id,
      quantity,
      sizes: showSizes ? selectedSize : null,
      seamSizes: showSeamSizes ? selectedSize : null,
      colorName: selectedColor,
    };
    dispatch(addToCart(payload))
      .unwrap()
      .then(() => {
        toast.success("Item added to cart successfully! 🛒");
      })
      .catch((error) => {
        toast.error(error?.message || "Failed to add item to cart.");
      });
  };

  const handleAddToWishlist = () => {
    if (!user) {
      toast.error("Please log in to add items to your wishlist.");
      return;
    }
    const payload = {
      userId: user._id,
      productId: product._id,
      size: showSizes ? selectedSize : null,
      seamSize: showSeamSizes ? selectedSize : null,
      colorName: selectedColor,
    };
    const isAlreadyInWishlist = wishlistItems.some(
      (item) =>
        item.productId === payload.productId &&
        item.colorName === payload.colorName &&
        item.size === payload.size &&
        item.seamSize === payload.seamSize
    );
    if (isAlreadyInWishlist) {
      toast.info("This item is already in your wishlist! ❤️");
      return;
    }
    dispatch(addToWishlist(payload))
      .unwrap()
      .then(() => {
        toast.info("Item added to wishlist!");
      })
      .catch((error) => {
        toast.error(error?.message || "Failed to add item to wishlist.");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product || !product.colors || product.colors.length === 0) {
    return <p>No product found or no images available.</p>;
  }

  // Breadcrumb: Navigate using products page filters for category/subcategory
  const categoryName = product.category?.name || "Category";
  const subCategoryName = product.subcategory?.name || "Subcategory";

  return (
    <div className="product-detailss">
      <div className="product-details__container">
        {/* Image Gallery */}
        <div className="product-details__gallery">
          <div className="product-details__main-image">
            <div className="wishlist">
              <FavoriteBorder onClick={handleAddToWishlist} />
            </div>
            <img src={mainImageUrl} alt="Selected Product" />
          </div>
          {selectedVariant && selectedVariant.photos && selectedVariant.photos.length > 0 && (
            <div className="product-details__thumbnails">
              {selectedVariant.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo.url}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${selectedThumbnail === index ? "active" : ""}`}
                  onClick={() => setSelectedThumbnail(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="product-details__info">
          <nav className="breadcrumb">
            <Link to="/">Home</Link> &gt;{" "}
            <Link to={`/products?category=${product.category?._id}`}>{categoryName}</Link> &gt;{" "}
            <Link to={`/products?subcategory=${product.subcategory?._id}`}>{subCategoryName}</Link> &gt;{" "}
            <span>{product.name}</span>
          </nav>
          <h1 className="product-details__title">{product.name}</h1>
          <div className="product-details__reviews">
            <Rating value={product.ratings || 0} readOnly precision={0.5} />
            <span>({product.numOfReviews} Reviews)</span>
          </div>
          <p className="product-details__price">${product.price?.toFixed(2)}</p>

          {/* Color Options */}
          <div className="product-details__colors">
            <p>Choose Color:</p>
            <div className="product-details__color-options">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className="color-option"
                  onClick={() => {
                    setSelectedColor(color.colorName);
                    setSelectedSize(null);
                    setSelectedThumbnail(0);
                  }}
                >
                  <img
                    src={
                      color.photos && color.photos.length > 0
                        ? color.photos[0].url
                        : "https://via.placeholder.com/30"
                    }
                    alt={color.colorName || `Color ${index + 1}`}
                    className={`color-image ${selectedColor === color.colorName ? "selected" : ""}`}
                  />
                  <span className="color-name">{color.colorName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Size or Seam Size Options */}
          {selectedVariant && (
            <div className="product-details__sizes">
              {showSizes ? (
                <>
                  <p>Choose Size:</p>
                  <div className="product-details__size-options">
                    {selectedVariant.sizes.map((item, index) => (
                      <span
                        key={index}
                        className={`size-box ${selectedSize === item.size ? "selected" : ""} ${item.stock === 0 ? "disabled" : ""}`}
                        onClick={() => {
                          if (item.stock === 0) {
                            toast.error("This size is out of stock");
                          } else {
                            setSelectedSize(item.size);
                          }
                        }}
                      >
                        {item.size}
                      </span>
                    ))}
                  </div>
                </>
              ) : showSeamSizes ? (
                <>
                  <p>Choose Seam Size:</p>
                  <div className="product-details__size-options">
                    {selectedVariant.seamSizes.map((item, index) => (
                      <span
                        key={index}
                        className={`size-box ${selectedSize === item.seamSize ? "selected" : ""} ${item.stock === 0 ? "disabled" : ""}`}
                        onClick={() => {
                          if (item.stock === 0) {
                            toast.error("This seam size is out of stock");
                          } else {
                            setSelectedSize(item.seamSize);
                          }
                        }}
                      >
                        {item.seamSize}
                      </span>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          )}

          {/* Quantity */}
          <div className="product-details_quantity">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          <button
            className="product-details__add-to-cart"
            disabled={buttonDisabled}
            onClick={handleAddToCart}
          >
            {buttonLabel}
          </button>

          <div className="product-details__description">
            <h3 onClick={() => setDescriptionOpen(!descriptionOpen)}>
              Description
              <span className="toggle-arrow">{descriptionOpen ? <Remove /> : <Add />}</span>
            </h3>
            {descriptionOpen && <p>{product.description}</p>}
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
     
        <SimilarProduct />
     

      {/* Reviews Section */}
      <div className="product-details__reviews-section">
        <h2>Customer Reviews</h2>
        {(!product.reviews || product.reviews.length === 0) ? (
          <p>No reviews available.</p>
        ) : (
          product.reviews.map((review, index) => (
            <div key={index} className="review">
              <p className="review__username">{review.username}</p>
              <p className="review__rating">⭐ {review.rating} / 5</p>
              <p className="review__comment">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
