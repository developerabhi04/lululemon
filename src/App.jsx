import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";


const Header = lazy(() => import("./Components/Layout/Header"));
const Footer = lazy(() => import("./Components/Layout/Footer"));

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
