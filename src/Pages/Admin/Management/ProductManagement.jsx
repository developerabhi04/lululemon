import { useEffect, useState, useRef } from "react";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import { toast } from "react-toastify";
import { fetchSingleProduct, updateProduct } from "../../../redux/slices/productSlices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import { fetchCategories } from "../../../redux/slices/categorySlices";



const ProductManagement = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((state) => state.products);

  const { categories } = useSelector((state) => state.categories)

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  // Image States
  const [photoFiles, setPhotoFiles] = useState([]);
  const [colorFiles, setColorFiles] = useState([]);
  const [colorNames, setColorNames] = useState([]);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [previewColors, setPreviewColors] = useState([]);

  // File Input Refs
  const photoInputRef = useRef(null);
  const colorInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCategories()); // Fetch categories on mount
    if (productId) dispatch(fetchSingleProduct(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setDescription(product.description);
      setCategory(product.category._id || "");
      setSubcategory(product.subcategory?._id || "");

      // ✅ Load existing images into preview
      setPreviewPhotos(product.photos.map((photo) => ({ url: photo.url, public_id: photo.public_id })));
      setPreviewColors(product.colors.map((color) => ({ url: color.url, public_id: color.public_id, name: color.colorName })));
      setColorNames(product.colors.map((color) => color.colorName));
    }
  }, [product]);

  // Handle Category Change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubcategory(""); // Reset subcategory when category changes
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => ({ url: URL.createObjectURL(file), file }));
    setPhotoFiles((prev) => [...prev, ...files]);
    setPreviewPhotos((prev) => [...prev, ...newPreviews]);
  };

  const handleColorUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => ({ url: URL.createObjectURL(file), file, name: "" }));
    setColorFiles((prev) => [...prev, ...files]);
    setPreviewColors((prev) => [...prev, ...newPreviews]);
    setColorNames((prev) => [...prev, ...files.map(() => "")]);
  };

  // ✅ Function to update color name
  const handleColorNameChange = (index, value) => {
    setColorNames((prev) => {
      const updatedNames = [...prev];
      updatedNames[index] = value;
      return updatedNames;
    });

    // Update color preview state as well
    setPreviewColors((prev) =>
      prev.map((item, i) => (i === index ? { ...item, name: value } : item))
    );
  };

  const removePhoto = (index) => {
    setPreviewPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeColor = (index) => {
    setPreviewColors((prev) => prev.filter((_, i) => i !== index));
    setColorFiles((prev) => prev.filter((_, i) => i !== index));
    setColorNames((prev) => prev.filter((_, i) => i !== index));
  };

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
    updatedData.append("subcategory", subcategory);
    updatedData.append("description", description);


    // ✅ Add Old Image Deletion Logic
    const deletedPhotos = product.photos
      .filter((photo) => !previewPhotos.some((p) => p.url === photo.url))
      .map((photo) => photo.public_id);

    const deletedColors = product.colors
      .filter((color) => !previewColors.some((c) => c.url === color.url))
      .map((color) => color.public_id);

    updatedData.append("deletedPhotos", JSON.stringify(deletedPhotos));
    updatedData.append("deletedColors", JSON.stringify(deletedColors));

    // ✅ Append new product photos
    photoFiles.forEach((file) => updatedData.append("photos", file));

    // ✅ Append new color images & names
    colorFiles.forEach((file, index) => {
      updatedData.append("colors", file);
      updatedData.append(`colorName${index}`, colorNames[index] || `Color ${index + 1}`);
    });

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
      <AdminSidebar />
      <main className="product-container">
        <h2>Update Product</h2>

        {loading ? (
          <p>Loading product...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <section className="product-form">
            <form onSubmit={submitHandler}>
              <div className="input-group">
                <label>Name</label>
                <input required type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="input-group">
                <label>Price</label>
                <input required type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
              </div>

              <div className="input-group">
                <label>Stock</label>
                <input required type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
              </div>

              <div className="input-group">
                <label>Description</label>
                <textarea required value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>

              <div className="input-group">
                <label>Category</label>
                <select required value={category} onChange={handleCategoryChange}>
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


              <div className="upload-section">
                <label>Product Images</label>
                <div className="file-upload" onClick={() => photoInputRef.current.click()}>
                  <FaCloudUploadAlt className="upload-icon" />
                  <span>Click to upload product images</span>
                </div>
                <input ref={photoInputRef} type="file" multiple accept="image/*" onChange={handlePhotoUpload} hidden />
                <div className="preview-images">
                  {previewPhotos.map((photo, index) => (
                    <div key={index} className="preview-item">
                      <img src={photo.url} alt="preview" />
                      <FaTrash className="delete-icon" onClick={() => removePhoto(index)} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="upload-section">
                <label>Color Images</label>
                <div className="file-upload" onClick={() => colorInputRef.current.click()}>
                  <FaCloudUploadAlt className="upload-icon" />
                  <span>Click to upload color images</span>
                </div>
                <input ref={colorInputRef} type="file" multiple accept="image/*" onChange={handleColorUpload} hidden />
                <div className="preview-images">
                  {previewColors.map((color, index) => (
                    <div key={index} className="preview-item">
                      <img src={color.url} alt="color preview" />
                      <FaTrash className="delete-icon" onClick={() => removeColor(index)} />
                      <input type="text" className="text-field" value={color.name} onChange={(e) => handleColorNameChange(index, e.target.value)} placeholder="Enter Color Name" />
                    </div>

                  ))}
                </div>
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Product"}
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
};

export default ProductManagement;
