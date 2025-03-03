import { useEffect, useState } from "react";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import { toast } from "react-toastify";
import { fetchSingleProduct, updateProduct } from "../../../redux/slices/productSlices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ProductManagement = () => {

  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error } = useSelector((state) => state.products);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [photo, setPhoto] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // ✅ Fetch products if Redux store is empty
  useEffect(() => {
    // dispatch(fetchSingleProduct(productId));
    if (productId) {
      dispatch(fetchSingleProduct(productId));
    } else {
      console.error("Product ID is undefined")
    }
  }, [dispatch, productId]);

  // ✅ Find product once products are loaded
  useEffect(() => {
console.log("product from redux store:", product)

    // if (product.length) {
      if (product) {
        setName(product.name);
        setPrice(product.price);
        setStock(product.stock);
        setDescription(product.description);
        setCategory(product.category);
        setPhoto(product.photos[0]?.url || "");
      // } else {
      //   toast.error("Product not found!");
      // }
    }
  }, [product]);

  // // ✅ Debugging: Check if productId and products are loaded
  useEffect(() => {
    console.log("Product ID:", productId);
    console.log("Fetched Product:", product);
  }, [productId, product]);

  // ✅ Handle Image Upload
  const changeImageHandler = (e) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhoto(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  // ✅ Handle Form Submission
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!product) {
      toast.error("Product not found! Cannot update.");
      return;
    }

    const updatedData = new FormData();
    updatedData.append("name", name);
    updatedData.append("price", price);
    updatedData.append("stock", stock);
    updatedData.append("category", category);
    updatedData.append("description", description);

    if (photoFile) {
      updatedData.append("photos", photoFile);
    }

    dispatch(updateProduct({ id: productId, updatedData })).then((res) => {
      if (!res.error) {
        toast.success("Product updated successfully! 🎉");
        setTimeout(() => navigate("/admin/products"), 2000);
      } else {
        toast.error(res.error || "Failed to update product ❌");
      }
    });
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <AdminSidebar />

      {loading ? (
        <p>Loading product...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : product ? (
        <>
          {/* Main */}
          <main className="management-section">
            <section>
              <strong>ID - {product._id} </strong>
              <img src={photo} alt="product" />
              <p>{name}</p>
              {stock > 0 ? (
                <span className="green">{stock} Available</span>
              ) : (
                <span className="red">Not Available</span>
              )}
              <h3>${price}</h3>
            </section>

            <article>
              <form onSubmit={submitHandler}>
                <h2>Update Product</h2>
                <div>
                  <label>Name</label>
                  <input required type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label>Price</label>
                  <input required type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                </div>
                <div>
                  <label>Stock</label>
                  <input required type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
                </div>
                <div>
                  <label>Description</label>
                  <input required type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                  <label>Category</label>
                  <input required type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div>
                  <label>Photo</label>
                  <input type="file" onChange={changeImageHandler} />
                </div>

                {photo && <img src={photo} alt="New Image" style={{ width: "100px", marginTop: "10px" }} />}

                <button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update Product"}
                </button>
              </form>
            </article>
          </main>
        </>
      ) : (
        <p>Product not found.</p>
      )}

    </div>
  );
};

export default ProductManagement;
