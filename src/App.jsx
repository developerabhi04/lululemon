import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Toastify CSS
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
import { ToastContainer } from "react-toastify";
import Banners from "./Pages/Admin/Banners";
import Category from "./Pages/Admin/Category";
import FirstBanner from "./Pages/Admin/Management/Banner/FirstBanner";
import SecondBanner from "./Pages/Admin/Management/Banner/SecondBanner";
import CompanyInfo from "./Pages/Admin/Management/Company/CompanyInfo";
import Coupons from "./Pages/Admin/Coupon";
import NewCoupon from "./Pages/Admin/Management/NewCoupon";
import CouponManagement from "./Pages/Admin/Management/CouponManagement";
import ThirdBanner from "./Pages/Admin/Management/Banner/ThirdBanner";
import FAQ from "./Pages/FooterSections/FAQ";
import AccessibilityStatement from "./Pages/FooterSections/AccessibilityStatement";
import ServicesPage from "./Pages/FooterSections/Services";
import Ordering from "./Pages/FooterSections/Ordering";
import ShippingPolicy from "./Pages/FooterSections/ShippingPolicy";
import PrivacyPolicy from "./Pages/FooterSections/PrivacyPolicy";





const App = () => {
  // const { isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
          <Route path="/product-details/:id" element={<MainLayout><ProductDetails /></MainLayout>} />
          <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
          <Route path="/wishlist" element={<MainLayout><Wishlist /></MainLayout>} />
          <Route path="/checkout-user" element={<MainLayout><Checkout /></MainLayout>} />

          <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
          <Route path="/orders" element={<MainLayout><Order /></MainLayout>} />
          <Route path="/orders-details" element={<MainLayout><OrderDetails /></MainLayout>} />


          {/* help */}
          <Route path="/faq" element={<MainLayout><FAQ /></MainLayout>} />
          <Route path="/accessibility-statement" element={<MainLayout><AccessibilityStatement /></MainLayout>} />
          <Route path="/services" element={<MainLayout><ServicesPage /></MainLayout>} />
          <Route path="/ordering" element={<MainLayout><Ordering /></MainLayout>} />
          <Route path="/shipping-policy" element={<MainLayout><ShippingPolicy /></MainLayout>} />
          <Route path="/privacy-policy" element={<MainLayout><PrivacyPolicy /></MainLayout>} />


          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<Signup />} />


          {/*Admin*/}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/banner" element={<Banners />} />
          <Route path="/admin/banner/first-banner" element={<FirstBanner />} />
          <Route path="/admin/banner/second-banner" element={<SecondBanner />} />
          <Route path="/admin/banner/third-banner" element={<ThirdBanner />} />

          <Route path="/admin/banner/company-info" element={<CompanyInfo />} />
          <Route path="/admin/coupons" element={<Coupons />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/transaction" element={<Transaction />} />


          {/* Charts */}
          <Route path="/admin/chart/bar" element={<BarCharts />} />
          <Route path="/admin/chart/pie" element={<PieCharts />} />
          <Route path="/admin/chart/line" element={<LineCharts />} />


          {/* management */}
          <Route path="/admin/products/new" element={<NewProduct />} />
          <Route path="/admin/coupons/new" element={<NewCoupon />} />
          <Route path="/admin/product/:productId" element={<ProductManagement />} />
          <Route path="/admin/coupon/:id" element={<CouponManagement />} />
          <Route path="/admin/transaction/:id" element={<TransactionManagement />} />

        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </>
  )
}

export default App
