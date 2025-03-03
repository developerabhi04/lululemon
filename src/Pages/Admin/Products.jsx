import { useCallback, useEffect } from "react";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import TableHOC from "../../Components/Admin/TableHOC";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlices";

const columns = [
  { Header: "Photo", accessor: "photo" },
  { Header: "Name", accessor: "name" },
  { Header: "Price", accessor: "price" },
  { Header: "Stock", accessor: "stock" },
  { Header: "Action", accessor: "action" },
];

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // ✅ Transform Redux products into table-friendly format
  const data = products.map((product) => ({
    photo: (
      <img
        style={{ width: "50px", height: "50px", borderRadius: "5px" }}
        src={product.photos[0]?.url || "https://via.placeholder.com/50"}
        alt="Product"
      />
    ),
    name: product.name,
    price: `$${product.price.toFixed(2)}`,
    stock: product.stock,
    action:product._id ? <Link to={`/admin/product/${product._id}`}>Manage</Link>: <span>Error</span>,
  }));

  // ✅ Corrected `useCallback`
  const Table = useCallback(() => {
    return TableHOC(columns, data, "dashboard-product-box", "Products", true)();
  }, [columns, data]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <Table />
        )}
      </main>
      <Link to={"/admin/products/new"} className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
