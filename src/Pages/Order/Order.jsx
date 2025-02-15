import { useNavigate } from "react-router-dom";
import product1 from "../../assets/products/LW3IKTS_069005_1.webp";
import product2 from "../../assets/products/LW3IKTS_069005_2.webp";


const Order = () => {
  const navigate = useNavigate()

  const orderDetails = () => {
    navigate("/orders-details")
  }
  return (
    <section className="order-page">
      <div className="container">
        {/* Page Header */}
        <header className="order-header">
          <h1>My Orders</h1>
          <p>Track your past orders and view their details below.</p>
        </header>

        {/* Orders List */}
        <div className="orders-list">
          {/* Single Order Card */}
          <div className="order-card">
            {/* Order Info */}
            <div className="order-header-info">
              <div className="order-info">
                <h3>Order #12345</h3>
                <p>Placed on: January 12, 2025</p>
                <p>Status: <span className="status delivered">Delivered</span></p>
              </div>
              <div className="view-details-btn">
                <button onClick={orderDetails}>View Details</button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <p><strong>Total:</strong> $199.99</p>
            </div>

            {/* Product Details */}
            <div className="order-details">
              <h4>Order Details:</h4>
              <div className="product-list">
                {/* Single Product */}
                <div className="product-item">
                  <div className="product-image">
                    <img
                      src={product1}
                      alt="Product"
                    />
                  </div>
                  <div className="product-info">
                    <h5>{"Women's T-Shirt"}</h5>
                    <p>Size: M</p>
                    <p>Quantity: 1</p>
                  </div>
                  <div className="product-price">
                    <p>$49.99</p>
                  </div>
                </div>

                <div className="product-item">
                  <div className="product-image">
                    <img
                      src={product2}
                      alt="Product"
                    />
                  </div>
                  <div className="product-info">
                    <h5>{"Women's Jeans"}</h5>
                    <p>Size: 32</p>
                    <p>Quantity: 1</p>
                  </div>
                  <div className="product-price">
                    <p>$149.99</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Another Order Card */}
          <div className="order-card">
            <div className="order-header-info">
              <div className="order-info">
                <h3>Order #12346</h3>
                <p>Placed on: December 25, 2024</p>
                <p>Status: <span className="status in-progress">In Progress</span></p>
              </div>
              <div className="view-details-btn">
                <button>View Details</button>
              </div>
            </div>
            <div className="order-summary">
              <p><strong>Total:</strong> $49.99</p>
            </div>
            <div className="order-details">
              <h4>Order Details:</h4>
              <div className="product-list">
                <div className="product-item">
                  <div className="product-image">
                    <img
                      src={product1}
                      alt="Product"
                    />
                  </div>
                  <div className="product-info">
                    <h5>{"women's Hoodie"}</h5>
                    <p>Size: L</p>
                    <p>Quantity: 1</p>
                  </div>
                  <div className="product-price">
                    <p>$49.99</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
