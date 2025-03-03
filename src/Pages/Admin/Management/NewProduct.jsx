import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import { addProduct } from "../../../redux/slices/productSlices";
import { toast} from "react-toastify"; // ✅ Import Toastify


const NewProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.products);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [photo, setPhoto] = useState("");
    const [description, setDescription] = useState("");
    const [photoFile, setPhotoFile] = useState(null); // Store selected file for submission
    const [category, setCategory] = useState("Uncategorized"); // Default category

    // ✅ Handle Image Change
    const changeImageHandler = (e) => {
        const file = e.target.files?.[0];
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setPhoto(reader.result);
                    setPhotoFile(file); // Store the actual file
                }
            };
        }
    };

    // ✅ Handle Form Submission
    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("category", category);
        formData.append("description", description);
        
        if (photoFile) {
            formData.append("photos", photoFile);
        }

        dispatch(addProduct(formData)).then((res) => {
            if (!res.error) {
                toast.success("Product created successfully! 🎉"); // ✅ Show success toast
                setTimeout(() => {
                    navigate("/admin/products"); // Redirect after a short delay
                }, 2000);
            } else {
                toast.error(res.error || "Failed to create product. ❌"); // ✅ Show error toast
            }
        });
    };

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main */}
            <main className="management-section">
                <article>
                    <form onSubmit={submitHandler}>
                        <h2>New Product</h2>

                        <div>
                            <label>Name</label>
                            <input
                                required
                                type="text"
                                placeholder="Product Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Price</label>
                            <input
                                required
                                type="number"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </div>

                        <div>
                            <label>Stock</label>
                            <input
                                required
                                type="number"
                                placeholder="Stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Description</label>
                            <input
                                required
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Stock</label>
                            <input
                                required
                                type="text"
                                placeholder="category"
                                value={category}
                                onChange={(e) => setCategory(Number(e.target.value))}
                            />
                        </div>

                        <div>
                            <label>Photo</label>
                            <input required type="file" onChange={changeImageHandler} />
                        </div>

                        {photo && <img src={photo} alt="Preview" style={{ width: "100px", marginTop: "10px" }} />}

                        <button type="submit" disabled={loading}>
                            {loading ? "Creating..." : "Create Product"}
                        </button>

                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </form>
                </article>
            </main>
        </div>
    );
};

export default NewProduct;
