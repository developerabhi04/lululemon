import { useEffect, useState } from "react";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import { toast } from "react-toastify";
import { fetchSingleProduct, updateProduct } from "../../../redux/slices/productSlices";
import { fetchCategories } from "../../../redux/slices/categorySlices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";

const ProductManagement = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  // Global product fields (global photos and global stock removed)
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  // Global sizes and seamSizes (if needed)
  const [globalSizes, setGlobalSizes] = useState([]);
  const [globalSeamSizes, setGlobalSeamSizes] = useState([]);

  // Color variants: each variant's structure:
  // { colorName, colorSizes, colorStocks, colorSeamSizes, colorSeamStocks, files, previews }
  const [colorVariants, setColorVariants] = useState([]);

  // Fetch categories and product on mount
  useEffect(() => {
    dispatch(fetchCategories());
    if (productId) {
      dispatch(fetchSingleProduct(productId));
    }
  }, [dispatch, productId]);

  // Once product loads, populate global fields and map color variants
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category?._id || "");
      setSubcategory(product.subcategory?._id || "");
      setGlobalSizes(product.sizes || []);
      setGlobalSeamSizes(product.seamSizes || []);
      if (product.colors && product.colors.length > 0) {
        const mappedVariants = product.colors.map((color) => {
          const sizesStr = color.sizes.map((s) => s.size).join(", ");
          const stocksStr = color.sizes.map((s) => s.stock).join(", ");
          const seamSizesStr = color.seamSizes.map((s) => s.seamSize).join(", ");
          const seamStocksStr = color.seamSizes.map((s) => s.stock).join(", ");
          // Map previews to an array of URL strings
          const previews = color.photos.map((photo) => photo.url);
          return {
            colorName: color.colorName,
            colorSizes: sizesStr,
            colorStocks: stocksStr,
            colorSeamSizes: seamSizesStr,
            colorSeamStocks: seamStocksStr,
            files: [], // No new files initially
            previews,
          };
        });
        setColorVariants(mappedVariants);
      }
    }
  }, [product]);

 

  // Update color variant field
  const handleColorVariantChange = (index, field, value) => {
    setColorVariants((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  // Remove a file from a specific variant
  const removeColorVariantFile = (variantIndex, fileIndex) => {
    setColorVariants((prev) => {
      const updated = [...prev];
      updated[variantIndex].previews = updated[variantIndex].previews.filter(
        (_, i) => i !== fileIndex
      );
      updated[variantIndex].files = updated[variantIndex].files.filter(
        (_, i) => i !== fileIndex
      );
      return updated;
    });
  };

  // Remove an entire color variant
  const removeColorVariant = (index) => {
    setColorVariants((prev) => prev.filter((_, i) => i !== index));
  };

  // Add a new empty color variant
  const addColorVariant = () => {
    setColorVariants((prev) => [
      ...prev,
      {
        colorName: "",
        colorSizes: "",
        colorStocks: "",
        colorSeamSizes: "",
        colorSeamStocks: "",
        files: [],
        previews: [],
      },
    ]);
  };

  // For file upload on a specific color variant
  const handleColorVariantFileUpload = (index, e) => {
    const files = Array.from(e.target.files);
    setColorVariants((prev) => {
      const updated = [...prev];
      updated[index].files = [
        ...(updated[index].files || []),
        ...files,
      ];
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      updated[index].previews = [
        ...(updated[index].previews || []),
        ...newPreviews,
      ];
      return updated;
    });
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
    updatedData.append("category", category);
    updatedData.append("subcategory", subcategory);
    updatedData.append("description", description);
    globalSizes.forEach((size) => updatedData.append("sizes", size));
    globalSeamSizes.forEach((seamSize) => updatedData.append("seamSizes", seamSize));

    // Append number of color variants
    updatedData.append("numColorVariants", colorVariants.length);
    colorVariants.forEach((variant, index) => {
      updatedData.append(
        `colorName${index}`,
        variant.colorName || `Color ${index + 1}`
      );
      updatedData.append(`colorSizes${index}`, variant.colorSizes || "");
      updatedData.append(`colorStocks${index}`, variant.colorStocks || "");
      updatedData.append(`colorSeamSizes${index}`, variant.colorSeamSizes || "");
      updatedData.append(`colorSeamStocks${index}`, variant.colorSeamStocks || "");
      // Append each file for this variant under field name `colorImages${index}`
      variant.files.forEach((file) =>
        updatedData.append(`colorImages${index}`, file)
      );
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
              {/* Global Product Fields */}
              <div className="input-group">
                <label>Name</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Price</label>
                <input
                  required
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Category</label>
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Subcategory</label>
                <select
                  required
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                >
                  <option value="">Select Subcategory</option>
                  {categories
                    .find((cat) => cat._id === category)
                    ?.subcategories.map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.name}
                      </option>
                    ))}
                </select>
              </div>
             

              {/* Global product photo section removed */}

              {/* Color Variants Section */}
              <div className="color-variants-section">
                <h3>Color Variants</h3>
                {colorVariants.map((variant, index) => (
                  <div key={index} className="color-variant">
                    <div className="variant-header">
                      <h4>Variant {index + 1}</h4>
                      {colorVariants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeColorVariant(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="input-group">
                      <label>Color Name</label>
                      <input
                        type="text"
                        placeholder={`Enter color name for variant ${index + 1}`}
                        value={variant.colorName || ""}
                        onChange={(e) =>
                          handleColorVariantChange(index, "colorName", e.target.value)
                        }
                      />
                    </div>
                    <div className="input-group">
                      <label>Sizes (comma-separated, e.g., S, M, L)</label>
                      <input
                        type="text"
                        placeholder="E.g. S, M, L, XL"
                        value={variant.colorSizes || ""}
                        onChange={(e) =>
                          handleColorVariantChange(index, "colorSizes", e.target.value)
                        }
                      />
                    </div>
                    <div className="input-group">
                      <label>Stocks (comma-separated, e.g., 10, 5, 0, 2)</label>
                      <input
                        type="text"
                        placeholder="E.g. 10, 5, 0, 2"
                        value={variant.colorStocks || ""}
                        onChange={(e) =>
                          handleColorVariantChange(index, "colorStocks", e.target.value)
                        }
                      />
                    </div>
                    <div className="input-group">
                      <label>Seam Sizes (comma-separated, e.g., 28, 30, 32)</label>
                      <input
                        type="text"
                        placeholder="E.g. 28, 30, 32"
                        value={variant.colorSeamSizes || ""}
                        onChange={(e) =>
                          handleColorVariantChange(index, "colorSeamSizes", e.target.value)
                        }
                      />
                    </div>
                    <div className="input-group">
                      <label>Seam Stocks (comma-separated, e.g., 10, 5, 0)</label>
                      <input
                        type="text"
                        placeholder="E.g. 10, 5, 0"
                        value={variant.colorSeamStocks || ""}
                        onChange={(e) =>
                          handleColorVariantChange(index, "colorSeamStocks", e.target.value)
                        }
                      />
                    </div>
                    <div className="upload-section">
                      <label className="file-upload">
                        <FaCloudUploadAlt className="upload-icon" />
                        <span>Upload images for this variant</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleColorVariantFileUpload(index, e)}
                          name={`colorImages${index}`}
                        />
                      </label>
                      <div className="preview-images">
                        {variant.previews &&
                          variant.previews.map((src, fileIndex) => (
                            <div key={fileIndex} className="preview-container">
                              <img src={src} alt={`Variant ${index + 1} preview`} />
                              <FaTrash
                                className="delete-icon"
                                onClick={() => removeColorVariantFile(index, fileIndex)}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addColorVariant}>
                  Add Another Variant
                </button>
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Product"}
              </button>
              {error && <p className="error-message">{error}</p>}
            </form>
          </section>
        )}
      </main>
    </div>
  );
};

export default ProductManagement;
