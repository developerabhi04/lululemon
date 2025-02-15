import { useState } from "react";
import AdminSidebar from "../../../Components/Admin/AdminSidebar";

const NewProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [photo, setPhoto] = useState("");

    const changeImageHandler = (e) => {
        const file = e.target.files?.[0];

        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result === "string") setPhoto(reader.result);
            };
        }
    };

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <AdminSidebar />

            {/* main */}
            <main className="management-section">
                <article>
                    <form action="">
                        <h2>New Product</h2>
                        <div>
                            <label>Name</label>
                            <input
                                required
                                type="text"
                                placeholder="Name"
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
                                onChange={(e) => setStock(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label>Photo</label>
                            <input required type="file" onChange={changeImageHandler} />
                        </div>

                        {photo && <img src={photo} alt="New Image" />}
                        <button type="submit">Create</button>
                    </form>
                </article>
            </main>
        </div>
    );
};

export default NewProduct;
