import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../../redux/slices/productSlices";
import { addToCart } from "../../redux/slices/cartSlices";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { product, loading, error } = useSelector((state) => state.products);


  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSeamSize, setSelectedSeamSize] = useState(null);
  const [selectedColorName, setSelectedColorName] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [descriptionOpen, setDescriptionOpen] = useState(false);


  const [reviews, setReviews] = useState([
    { username: "JohnDoe", rating: 4, comment: "Great product!" },
    { username: "JaneSmith", rating: 5, comment: "Amazing quality and design." },
  ]);



  useEffect(() => {
    dispatch(fetchSingleProduct(id))
  }, [dispatch, id])


  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0].colorName);
      }
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      if (product.seamSizes && product.seamSizes.length > 0) {
        setSelectedSeamSize(product.seamSizes[0]);
      }
      if (product.colorName && product.colorName.length > 0) {
        setSelectedColorName(product.colorName[0]);
      }
    }
  }, [product]);



  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    if (!selectedSize || !selectedSeamSize ) {
      toast.error("Please select a size, seam size and color before adding to cart.");
      return;
    }

    dispatch(
      addToCart({
        userId: user._id,
        productId: product._id,
        quantity,
        sizes: selectedSize,
        seamSizes: selectedSeamSize,
        colorName: selectedColorName,
      })
    );

    toast.success(`${product.name} has been added to your cart!`);
  };




  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!product || !product.photos || product.photos.length === 0) {
    return <p>No product found or no photos available.</p>;
  }

  // Breadcrumb Data
  const categoryName = product.category?.name || "Category";
  const subCategoryName = product.subcategory?.name || "Subcategory";
  // const productName = `${product.name} (${product.colors[0]?.colorName || "Color"}, ${product.sizes[0] || "Size"})`;

  return (
    <div className="product-detailss">
      <div className="product-details__container">
        {/* Image Gallery */}
        <div className="product-details__gallery">
          <div className="product-details__main-image">
            <img src={product.photos[selectedImage]?.url} alt="Selected Product" />
          </div>
          <div className="product-details__thumbnails">
            {product.photos.map((photo, index) => (
              <img
                key={index}
                src={photo?.url}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="product-details__info">
          {/* breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/">Home</Link> &gt;{" "}
            <Link to={`/category/${product.category?._id}`}>{categoryName}</Link> &gt;{" "}
            <Link to={`/subcategory/${product.subcategory?._id}`}>{subCategoryName}</Link> &gt;{" "}
            <span>{product.name}</span>
          </nav>

          <h1 className="product-details__title">{product.name}</h1>

          {/* Rating */}
          <div className="product-details__reviews">
            <Rating value={product.ratings || 0} readOnly precision={0.5} />
            <span>({product.numOfReviews} Reviews)</span>
          </div>

          {/* price */}
          <p className="product-details__price">${product.price?.toFixed(2)}</p>




          {/* Color Options */}
          <div className="product-details__colors">
            <p>Choose Color:</p>
            <div className="product-details__color-options">
              {product.colors.map((color, index) => (
                <div key={index} className="color-option">
                  <img
                    key={index}
                    src={color?.url}
                    alt={color?.colorName || `Color ${index + 1}`}
                    className={`color-image ${selectedColor === color.colorName ? "selected" : ""}`}
                    onClick={() => setSelectedColor(color.colorName)}
                  />
                  <span className="color-name">{color.colorName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          {/* <div className="selector">
            <label htmlFor="color-selector">Color:</label>
            <select
              id="color-selector"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              {product.colors.map((color) => (
                <option key={color.colorName} value={color.colorName}>
                  {color.colorName}
                </option>
              ))}
            </select>
          </div> */}

          {/* Size Selector */}
          {!selectedSeamSize && (
            <div className="product-details__sizes">
              <p>Choose Size (For Tops):</p>
              <div className="product-details__size-options">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className={`size-box ${selectedSize === size ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedSize(size);
                      setSelectedSeamSize(null); // Clear seam size if size is selected
                    }}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}




          {/* SeamSize Options */}
          {!selectedSize && (
            <div className="product-details__sizes">
              <p>Choose Seam Size (For Bottoms):</p>
              <div className="product-details__size-options">
                {product.seamSizes.map((size) => (
                  <span
                    key={size}
                    className={`size-box ${selectedSeamSize === size ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedSeamSize(size);
                      setSelectedSize(null); // Clear size if seam size is selected
                    }}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}



          {/* quantity */}
          <div className="product-details_quantity">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>


          {/* Add to Cart Button */}
          {/* <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button> */}

          {/* Add to Cart Button */}
          <button className="product-details__add-to-cart"
            disabled={product.stock === 0 || !selectedSize}
            onClick={handleAddToCart}
          >
            {product.stock > 0
              ? selectedSize
                ? "Add to Cart"
                : "Select Size"
              : "Out of Stock"}
          </button>



          {/* Collapsible Description */}
          <div className="product-details__description">
            <h3 onClick={() => setDescriptionOpen(!descriptionOpen)}>
              Description
              <span className="toggle-arrow">{descriptionOpen ? <Remove /> : <Add />}</span>
            </h3>
            {descriptionOpen && <p>{product.description}</p>}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="product-details__reviews-section">
        <h2>Customer Reviews</h2>
        {!product.reviews || product.reviews.length === 0 ? (
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


      {/* Similar Products Section */}
      <div className="product-details__similar-products">
        <h2>Similar Products</h2>
        <div className="similar-products__grid">
          {/* {similarProducts.map((product) => (
            <div key={product.id} className="similar-product-card">
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p>${product.price.toFixed(2)}</p>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
