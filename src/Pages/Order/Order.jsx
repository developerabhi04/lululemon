import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrders } from "../../redux/slices/orderSlices";


const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleOrderDetails = (id) => {
    navigate(`/orders-details/${id}`);
  };

  if (loading) return <p className="error">Loading... {error}</p>;
  if (error) return <p className="error">Error loading orders: {error}</p>;

  return (
    <section className="order-page">
      <div className="container">
        <div className="order-header">
          <h1>My Orders</h1>
          <p>Track your past orders and view their details below.</p>
        </div>

        <div className="orders-list">
          {orders?.length === 0 ? (
            <p className="no-orders">No orders found.</p>
          ) : (
            orders?.map((order) => (
              <div className="order-card" key={order._id}>
                <div className="order-header-info">
                  <div className="order-info">
                    <h3>Order #{order._id.slice(-10).toUpperCase()}</h3>
                    <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p>
                      Status:{" "}
                      <span className={`status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </p>
                  </div>
                  <div className="view-details-btn">
                    <button onClick={() => handleOrderDetails(order._id)}>
                      View Details
                    </button>
                  </div>
                </div>

                <div className="order-summary">
                  <p>
                    <strong>Total:</strong> ${order.total}
                  </p>
                </div>

                <div className="order-details">
                  <h4>Order Details:</h4>
                  <div className="product-list">
                    {order.cartItems?.map((item) => (
                      <div className="product-item" key={item._id}>
                        <div className="product-image">
                          <img
                            src={item.imageUrl || "https://via.placeholder.com/100"}
                            alt={item.name}
                          />
                        </div>
                        <div className="product-info">
                          <h5>{item.name}</h5>
                          <p>Size: {item.selectedSize}</p>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                        <div className="product-price">
                          <p>${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Order;
