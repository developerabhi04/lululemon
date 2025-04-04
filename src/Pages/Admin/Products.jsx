import { useCallback, useEffect } from "react";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import TableHOC from "../../Components/Admin/TableHOC";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../../redux/slices/productSlices";
import { toast } from "react-toastify";

const columns = [
  { Header: "Photo", accessor: "photo" },
  { Header: "Name", accessor: "name" },
  { Header: "Price", accessor: "price" },
  { Header: "Stock", accessor: "stock" },
  { Header: "Category", accessor: "categoryName" },
  { Header: "Subcategory", accessor: "subcategoryName" },
  { Header: "Colors", accessor: "colors" },
  { Header: "Edit", accessor: "edit" },
  { Header: "Delete", accessor: "delete" },
];

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id))
        .unwrap()
        .then(() => {
          toast.success("Product deleted successfully!");
        })
        .catch((error) => {
          toast.error(`Failed to delete product: ${error}`);
        });
    }
  };

  // Transform Redux products into table-friendly format
  const data = products.map((product) => {
    // Use the first color variant's first photo for the "photo" column.
    const firstColorPhoto =
      product.colors &&
        product.colors.length > 0 &&
        product.colors[0].photos &&
        product.colors[0].photos.length > 0
        ? product.colors[0].photos[0].url
        : "https://via.placeholder.com/50";

    // Compute overall stock from all color variants sizes
    const overallStock = product.colors
      ? product.colors.reduce((total, color) => {
        const colorStock = color.sizes
          ? color.sizes.reduce((sum, s) => sum + s.stock, 0)
          : 0;
        return total + colorStock;
      }, 0)
      : 0;

    return {
      photo: (
        <img
          style={{ width: "50px", height: "50px", borderRadius: "5px" }}
          src={firstColorPhoto}
          alt="Product"
        />
      ),
      name: product.name,
      price: `$${product.price.toFixed(2)}`,
      stock: overallStock,
      categoryName: product.category?.name || "N/A",
      subcategoryName: product.subcategory?.name || "N/A",
      colors: (
        <div style={{ display: "flex", gap: "5px" }}>
          {product.colors && product.colors.length > 0 ? (
            product.colors.map((color, index) => (
              <img
                key={index}
                src={
                  color.photos && color.photos.length > 0
                    ? color.photos[0].url
                    : "https://via.placeholder.com/30"
                }
                alt={color.colorName}
                title={color.colorName}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              />
            ))
          ) : (
            <span>No Colors</span>
          )}
        </div>
      ),
      edit: (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/admin/product/${product._id}`}>
            <FaEdit style={{ cursor: "pointer", color: "blue" }} title="Edit" />
          </Link>
        </div>
      ),
      delete: (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link>
            <FaTrash
              style={{ cursor: "pointer", color: "red" }}
              title="Delete"
              onClick={() => handleDelete(product._id)}
            />
          </Link>
        </div>
      ),
    };
  });

  const Table = useCallback(() => {
    return TableHOC(columns, data, "dashboard-product-box", "Products", true)();
  }, [data]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        <Table />
      </main>
      <Link to={"/admin/products/new"} className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
