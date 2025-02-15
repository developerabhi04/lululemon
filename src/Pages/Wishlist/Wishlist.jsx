import product1 from "../../assets/products/LW3IKTS_069005_1.webp";
import product2 from "../../assets/products/LW3IKTS_069005_2.webp";
import product3 from "../../assets/products/LW3IKTS_069005_3.webp";

const Wishlist = () => {
  const wishlistItems = [
    {
      id: 1,
      name: "Classic T-Shirt",
      price: "$24.99",
      image: product1,
    },
    {
      id: 2,
      name: "Elegant Dress",
      price: "$49.99",
      image: product2,
    },
    {
      id: 3,
      name: "Stylish Sneakers",
      price: "$79.99",
      image: product3,
    },
  ];

  return (
    <section className="wishlist-page">
      <div className="container">
        <h1 className="page-heading">My Wishlist</h1>
        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <p>Your wishlist is empty. Start adding your favorite products!</p>
            <button className="shop-now">Shop Now</button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-card">
                <div className="wishlist-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="wishlist-details">
                  <h3>{item.name}</h3>
                  <p className="price">{item.price}</p>
                  <div className="wishlist-actions">
                    <button className="move-to-cart">Move to Cart</button>
                    <button className="remove-item">Remove</button>
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
