import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import ProductDetails from "./Pages/ProductsDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import SignIn from "./Pages/User/SignIn";
import Signup from "./Pages/User/Signup";
import Checkout from "./Pages/User/Checkout";
import MainLayout from "./Components/Layout/MainLayout";


// Admin
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminProducts from "./Pages/Admin/Products";
import Customers from "./Pages/Admin/Customers";
import Transaction from "./Pages/Admin/Transaction";
import BarCharts from "./Pages/Admin/Charts/BarCharts";
import PieCharts from "./Pages/Admin/Charts/PieCharts";
import LineCharts from "./Pages/Admin/Charts/LineCharts";
import NewProduct from "./Pages/Admin/Management/NewProduct";
import ProductManagement from "./Pages/Admin/Management/ProductManagement";
import TransactionManagement from "./Pages/Admin/Management/TransactionManagement";
import Profile from "./Pages/User/Profile";
import Order from "./Pages/Order/Order";
import OrderDetails from "./Pages/Order/OrderDetails";
import Wishlist from "./Pages/Wishlist/Wishlist";




const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
          <Route path="/product-details" element={<MainLayout><ProductDetails /></MainLayout>} />
          <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
          <Route path="/wishlist" element={<MainLayout><Wishlist /></MainLayout>} />
          <Route path="/checkout-user" element={<MainLayout><Checkout /></MainLayout>} />
          <Route path="/sign-in" element={<MainLayout><SignIn /></MainLayout>} />
          <Route path="/sign-up" element={<MainLayout><Signup /></MainLayout>} />
          <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
          <Route path="/orders" element={<MainLayout><Order /></MainLayout>} />
          <Route path="/orders-details" element={<MainLayout><OrderDetails /></MainLayout>} />

          {/*Admin*/}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/transaction" element={<Transaction />} />


          {/* Charts */}
          <Route path="/admin/chart/bar" element={<BarCharts />} />
          <Route path="/admin/chart/pie" element={<PieCharts />} />
          <Route path="/admin/chart/line" element={<LineCharts />} />


          {/* management */}
          <Route path="/admin/products/new" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<ProductManagement />} />
          <Route path="/admin/transaction/:id" element={<TransactionManagement />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
