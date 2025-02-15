import { useState } from "react";
import Product1 from "../../assets/products/LW3IKTS_069005_1.webp";
import Product2 from "../../assets/products/LW3IKTS_069005_2.webp";
import Product3 from "../../assets/products/LW3IKTS_069005_3.webp";
import Product4 from "../../assets/products/LW3IKTS_069005_4.webp";
import Product5 from "../../assets/products/LW3IKTS_069005_5.webp";

// Sample Color Images
import Color1 from "../../assets/payment/0001.webp";
import Color2 from "../../assets/payment/33454.webp";
import Color3 from "../../assets/payment/35955.webp";
import Color4 from "../../assets/payment/68872.webp";
import Color5 from "../../assets/payment/69005.webp";
import Color6 from "../../assets/payment/69401.webp";

import { Rating } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState(null);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [reviews, setReviews] = useState([
    { username: "JohnDoe", rating: 4, comment: "Great product!" },
    { username: "JaneSmith", rating: 5, comment: "Amazing quality and design." },
  ]);

  const product = {
    title: "BeCalm Scoop-Neck Pullover",
    description:
      "This is a stylish and comfortable scoop-neck pullover perfect for casual wear. It is made from high-quality materials to ensure durability and a great fit.",
    price: 129.99,
    images: [Product1, Product2, Product3, Product4, Product5],
    reviews: 4.5,
    stock: 10,
    colors: [
      { name: "Black", image: Color1 },
      { name: "White", image: Color2 },
      { name: "Blue", image: Color3 },
      { name: "Pink", image: Color4 },
      { name: "Red", image: Color5 },
      { name: "Green", image: Color6 },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  };

  const similarProducts = [
    { id: 1, image: Product1, title: "Similar Product 1", price: 99.99 },
    { id: 2, image: Product2, title: "Similar Product 2", price: 119.99 },
    { id: 3, image: Product3, title: "Similar Product 3", price: 89.99 },
    { id: 4, image: Product4, title: "Similar Product 4", price: 109.99 },
  ];

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

          <div className="product-details__reviews">
            <Rating
              value={product.reviews}
              readOnly
              precision={0.5}
              sx={{
                "& .MuiRating-iconFilled": { color: "#c8102e" },
              }}
            />
            {" "}
            {product.reviews}
          </div>
          
          <p className="product-details__price">${product.price.toFixed(2)}</p>




          {/* Color Options */}
          <div className="product-details__colors">
            <p>Choose Color:</p>
            <div className="product-details__color-options">
              {product.colors.map((color) => (
                <img
                  key={color.name}
                  src={color.image}
                  alt={color.name}
                  className={`color-image ${selectedColor === color.name ? "selected" : ""}`}
                  onClick={() => setSelectedColor(color.name)}
                />
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
                  className={`size-box ${selectedSize === size ? "selected" : ""}`}
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
        <div className="product-details__review-list">
          {reviews.map((review, index) => (
            <div key={index} className="review">
              <p className="review__username">{review.username}</p>
              <p className="review__rating">⭐ {review.rating} / 5</p>
              <p className="review__comment">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="product-details__similar-products">
        <h2>Similar Products</h2>
        <div className="similar-products__grid">
          {similarProducts.map((product) => (
            <div key={product.id} className="similar-product-card">
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p>${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
