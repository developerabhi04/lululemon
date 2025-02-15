import { useCallback, useState } from "react";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import TableHOC from "../../Components/Admin/TableHOC";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";


const columns = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const img = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";
const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";

const arr = [
  {
    photo: <img src={img} alt="Shoes" />,
    name: "Puma Shoes Air Jordan Cook 2023",
    price: 1000,
    stock: 4,
    action: <Link to={"/admin/product/ajkdk"}>Manage</Link>,
  },
  {
    photo: <img src={img2} alt="Shoes" />,
    name: "Macbook M3 256gb 8gb ram",
    price: 2000,
    stock: 10,
    action: <Link to={"/admin/product/ajkdk"}>Manage</Link>,
  },
  {
    photo: <img src={img2} alt="Shoes" />,
    name: "Macbook M3 256gb 8gb ram",
    price: 2000,
    stock: 10,
    action: <Link to={"/admin/product/ajkdk"}>Manage</Link>,
  },
  {
    photo: <img src={img} alt="Shoes" />,
    name: "Puma Shoes Air Jordan Cook 2023",
    price: 1000,
    stock: 4,
    action: <Link to={"/admin/product/ajkdk"}>Manage</Link>,
  },
];

const Products = () => {
  const [data] = useState(arr);

  const Table = useCallback(
    TableHOC(columns, data, "dashboard-product-box", "Products", true),
    []
  );

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main */}
      <main>{Table()}</main>
      <Link to={"/admin/products/new"} className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
