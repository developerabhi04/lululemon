import { useCallback, useState } from "react";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import TableHOC from "../../Components/Admin/TableHOC";
import { FaTrash } from "react-icons/fa";


const columns = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const img = "https://randomuser.me/api/portraits/women/54.jpg";
const img2 = "https://randomuser.me/api/portraits/women/50.jpg";

const arr = [
  {
    avatar: (
      <img style={{ borderRadius: "50%" }} src={img} alt="Avatar" />
    ),
    name: "Emily Palmer",
    email: "emily.palmer@example.com",
    gender: "female",
    role: "user",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
  {
    avatar: (
      <img style={{ borderRadius: "50%" }} src={img2} alt="Avatar"/>
    ),
    name: "May Scoot",
    email: "aunt.may@example.com",
    gender: "female",
    role: "user",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
];

const Customers = () => {
  const [data] = useState(arr);

  const Table = useCallback(
    TableHOC(columns, data, "dashboard-product-box", "Customers", true),
    []
  );

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main */}
      <main>{Table()}</main>
    </div>
  );
};

export default Customers;
