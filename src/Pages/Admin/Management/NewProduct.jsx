import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import { toast } from "react-toastify";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa"; // Upload Icon
import { fetchCategories } from "../../../redux/slices/categorySlices";
import { addProduct } from "../../../redux/slices/productSlices";

const NewProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ✅ Fetch categories from Redux
    const { categories } = useSelector((state) => state.categories);
    const { loading, error } = useSelector((state) => state.products);

    // ✅ State Variables
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [sizes, setSizes] = useState([]);
    // const [newSize, setNewSize] = useState("");
    const [seamSizes, setSeamSizes] = useState([]);
    const [photoFiles, setPhotoFiles] = useState([]);
    const [colorFiles, setColorFiles] = useState([]);
    const [colorNames, setColorNames] = useState([]);
    const [previewPhotos, setPreviewPhotos] = useState([]); // ✅ Preview for product images
    const [previewColors, setPreviewColors] = useState([]); // ✅ Preview for color images




    
    // ✅ Fetch categories when component mounts
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // ✅ Handle Product Image Uploads
    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        setPhotoFiles([...photoFiles, ...files]);

        // ✅ Generate previews for UI
        const previews = files.map((file) => URL.createObjectURL(file));
        setPreviewPhotos([...previewPhotos, ...previews]);
    };


    // ✅ Handle Color Image Uploads
    const handleColorUpload = (e) => {
        const files = Array.from(e.target.files);
        setColorFiles([...colorFiles, ...files]);

        // ✅ Generate previews for UI
        const previews = files.map((file) => URL.createObjectURL(file));
        setPreviewColors([...previewColors, ...previews]);
    };


    // ✅ Handle Size Changes
    const handleSizeChange = (e) => {
        const selectedSizes = Array.from(e.target.selectedOptions).map(option => option.value);
        setSizes(selectedSizes);
    };

    // ✅ Handle Seam Size Changes
    const handleSeamSizeChange = (e) => {
        console.log("Seam Size Change:", e.target.value);
        const selectedSeamSizes = Array.from(e.target.selectedOptions).map(option => parseInt(option.value, 10));
        setSeamSizes(selectedSeamSizes);
    };





    // ✅ Handle Remove Product Image
    const removeProductImage = (index) => {
        const updatedPhotos = previewPhotos.filter((_, i) => i !== index);
        const updatedFiles = photoFiles.filter((_, i) => i !== index);
        setPreviewPhotos(updatedPhotos);
        setPhotoFiles(updatedFiles);
    };

    // ✅ Handle Remove Color Image
    const removeColorImage = (index) => {
        const updatedColors = previewColors.filter((_, i) => i !== index);
        const updatedFiles = colorFiles.filter((_, i) => i !== index);
        setPreviewColors(updatedColors);
        setColorFiles(updatedFiles);
    };

    // ✅ Handle Color Name Input
    const handleColorNameChange = (index, value) => {
        const updatedColorNames = [...colorNames];
        updatedColorNames[index] = value;
        setColorNames(updatedColorNames);
    };

    // ✅ Handle Form Submission
    const submitHandler = async (e) => {
        e.preventDefault();

        if (!name || !price || !stock || !category || !subcategory || !description) {
            toast.error("Please fill all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("category", category);
        formData.append("subcategory", subcategory);
        formData.append("description", description);
        // formData.append("sizes", sizes.join(","));
        // formData.append("seamSizes", seamSizes.join(","));

        // ✅ Append Sizes and Seam Sizes
        sizes.forEach((size) => formData.append("sizes", size));
        seamSizes.forEach((seamSize) => formData.append("seamSizes", seamSize));

        // ✅ Append Product Photos
        photoFiles.forEach((file) => formData.append("photos", file));

        // ✅ Append Color Images & Names
        colorFiles.forEach((file, index) => {
            formData.append("colors", file);
            formData.append(`colorName${index}`, colorNames[index] || `Color ${index + 1}`);
        });

        dispatch(addProduct(formData)).then((res) => {
            if (!res.error) {
                toast.success("Product created successfully! 🎉");
                setTimeout(() => navigate("/admin/products"), 2000);
            } else {
                toast.error(res.error || "Failed to create product. ❌");
            }
        });
    };

    return (
        <div className="admin-container">
            <AdminSidebar />
            <main className="product-container">
                <h2>Create New Product</h2>
                <section className="product-form">
                    <form onSubmit={submitHandler}>
                        <div className="input-group">
                            <label>Name</label>
                            <input required type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="input-group">
                            <label>Price</label>
                            <input required type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>

                        <div className="input-group">
                            <label>Stock</label>
                            <input required type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
                        </div>

                        <div className="input-group">
                            <label>Description</label>
                            <textarea required placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        <div className="input-group">
                            <label>Category</label>
                            <select required value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="input-group">
                            <label>Subcategory</label>
                            <select required value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                                <option value="">Select Subcategory</option>
                                {categories.find((cat) => cat._id === category)?.subcategories.map((sub) => (
                                    <option key={sub._id} value={sub._id}>{sub.name}</option>
                                ))}
                            </select>
                        </div>



                        <div className="input-group">
                            <label>Sizes:</label>
                            <select multiple  value={sizes} onChange={handleSizeChange}>
                                {/* <option value="">Select Size</option> */}
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label>Seam Sizes:</label>
                            <select multiple  value={seamSizes} onChange={handleSeamSizeChange}>
                                {/* <option value="">Select Size</option> */}
                                <option value="28">28</option>
                                <option value="30">30</option>
                                <option value="32">32</option>
                                <option value="34">34</option>
                                <option value="36">36</option>
                            </select>
                        </div>






                        <div className="upload-section">
                            <label className="file-upload">
                                <FaCloudUploadAlt className="upload-icon" />
                                <span>Click to upload product images</span>
                                <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} />
                            </label>

                            {/* ✅ Show Uploaded Images */}
                            <div className="preview-images">
                                {previewPhotos.map((src, index) => (
                                    <div key={index} className="preview-container">
                                        <img src={src} alt="preview" />
                                        <FaTimes className="remove-icon" onClick={() => removeProductImage(index)} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="upload-section">
                            <label className="file-upload">
                                <FaCloudUploadAlt className="upload-icon" />
                                <span>Click to upload color images</span>
                                <input type="file" multiple accept="image/*" onChange={handleColorUpload} />
                            </label>

                            {/* ✅ Show Uploaded Color Images */}
                            <div className="preview-images">
                                {previewColors.map((src, index) => (
                                    <div key={index} className="preview-container">
                                        <img src={src} alt="color preview" />
                                        <FaTimes className="remove-icon" onClick={() => removeColorImage(index)} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {colorFiles.map((_, index) => (
                            <div key={index} className="input-group">
                                <label>Color Name {index + 1}</label>
                                <input
                                    type="text"
                                    placeholder={`Enter color name ${index + 1}`}
                                    value={colorNames[index] || ""}
                                    onChange={(e) => handleColorNameChange(index, e.target.value)}
                                />
                            </div>
                        ))}

                        <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Product"}</button>

                        {error && <p className="error-message">{error}</p>}
                    </form>
                </section>
            </main>
        </div>
    );
};

export default NewProduct;
