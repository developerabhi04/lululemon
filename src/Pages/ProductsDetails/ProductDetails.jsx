import { useState } from "react";

import Product1 from "../../assets/products/LW3IKTS_069005_1.webp";
import Product2 from "../../assets/products/LW3IKTS_069005_2.webp";
import Product3 from "../../assets/products/LW3IKTS_069005_3.webp";
import Product4 from "../../assets/products/LW3IKTS_069005_4.webp";
import Product5 from "../../assets/products/LW3IKTS_069005_5.webp";
import { Rating } from "@mui/material";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([
    { username: "JohnDoe", rating: 4, comment: "Great product!" },
    { username: "JaneSmith", rating: 5, comment: "Amazing quality and design." },
  ]);
  // const [newReview, setNewReview] = useState("");

  const product = {
    title: "BeCalm Scoop-Neck Pullover",
    description: "lorem ipsum",
    price: 129.99,
    images: [Product1, Product2, Product3, Product4, Product5],
    reviews: 4.5,
    stock: 10,
    colors: ["Black", "White", "Blue"],
    sizes: ["XS", "S", "M", "L", "XL"],
  }


  // const addReview = () => {
  //   if (newReview.trim()) {
  //     setReviews([
  //       ...reviews,
  //       { username: "Anonymous", rating: 5, comment: newReview },
  //     ]);
  //     setNewReview("");
  //   }
  // };

  const options = {
    // size: "large", 
    value: 4,
    readOnly: true,
    precision: 0.5, // To support half-stars

  };

  return (
    <div className="product-details">
      <div className="product-details__container">
        {/* Image Gallery */}
        <div className="product-details__gallery">
          <div className="product-details__main-image">
            <img src={product.images[selectedImage]} alt="Selected Product" />
          </div>
          <div className="product-details__thumbnails">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="product-details__info">
          <h1 className="product-details__title">{product.title}</h1>
          <p className="product-details__description">{product.description}</p>
          <p className="product-details__price">${product.price.toFixed(2)}</p>
          <div className="product-details__reviews">
            <Rating
              onChange={(e) => setRating(e.target.value)}
              value={options.value}
              size="smaller"
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#c8102e", // Filled star color
                },
              }}
            /> {"  "}
            {product.reviews} {"  "}
            <span className="product-details__stock">
              ({product.stock > 0 ? "In Stock" : "Out of Stock"})
            </span>
          </div>

          {/* Color Options */}
          <div className="product-details__colors">
            <p>Choose Color:</p>
            <div className="product-details__color-options">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className={`color-circle ${selectedColor === color ? "selected" : ""
                    }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                ></span>
              ))}
            </div>
          </div>

          {/* Size Options */}
          <div className="product-details__sizes">
            <p>Choose Size:</p>
            <div className="product-details__size-options">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className={`size-box ${selectedSize === size ? "selected" : ""
                    }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className="product-details__add-to-cart"
            disabled={product.stock === 0 || !selectedSize}
          >
            {product.stock > 0
              ? selectedSize
                ? "Add to Cart"
                : "Select Size"
              : "Out of Stock"}
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="product-details__reviews-section">
        <h2>Customer Reviews</h2>
        <div className="product-details__review-list">
          {reviews.map((review, index) => (
            <div key={index} className="review">
              <p className="review__username">{review.username}</p>
              <p className="review__rating">⭐ {review.rating} / 5</p>
              <p className="review__comment">{review.comment}</p>
            </div>
          ))}
        </div>
        {/* <div className="product-details__add-review">
          <textarea
            placeholder="Write your review here..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <button onClick={addReview}>Submit Review</button>
        </div> */}
      </div>
    </div>
  );
};

export default ProductDetails;
