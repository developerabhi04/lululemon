import { useState } from "react";
import { Link } from "react-router-dom";
import { AddShoppingCart, Facebook, Favorite, Instagram, Mail, Person, Phone, Search, X, YouTube } from "@mui/icons-material";
import logo from "../../assets/Fem-Cartel-Wording-1400x352.png"


// Header Component
const Header = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  // Dropdown data
  const dropdownItems = {
    women: ["Tops", "Dresses", "Jeans", "Accessories"],
    accessories: ["Shirts", "Pants", "Shoes", "Watches", "Tops", "Dresses", "Jeans", "Accessories"],
  };

  return (
    <>
      <nav className="wapper-header">
        <div className="nav">

          <div className="nav-div">
            <ul className="nav-ul">
              <li className="nav-li">
                <Phone />
                <span className="nav-span">(+193) 889-4399</span>
              </li>

              <li className="nav-li">
                <Mail />
                <span className="nav-span">demo@email.com</span>
              </li>
            </ul>
          </div>


          <div className="social-div">
            <ul className="social-media">
              <li className="link">
                <Facebook />
              </li>

              <li className="link">
                <Instagram />
              </li>

              <li className="link">
                <X />
              </li>

              <li className="link">
                <YouTube />
              </li>
            </ul>
          </div>



        </div>
      </nav>



      <header className="Header">
        <div className="Header-container">
          {/* Logo */}
          <div className="logo">
            <Link to={`/`}>
              <img src={logo} alt="Logo" />
              {/* <h1>lululemon athletica</h1> */}
            </Link>
          </div>

          {/* Middle Section with Dropdowns */}
          <div className="middle">
            <ul className="nav-list">

              <li className="nav-item"
                onMouseEnter={() => setHoveredItem("women")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                Women
                {hoveredItem === "women" && <Dropdown items={dropdownItems.women} />}
              </li>

              {/* <li className="nav-item"
                onMouseEnter={() => setHoveredItem("men")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                Men
                {hoveredItem === "men" && <Dropdown items={dropdownItems.men} />}
              </li> */}

              <li className="nav-item" onMouseEnter={() => setHoveredItem("accessories")}
                onMouseLeave={() => setHoveredItem(null)}>
                Accessories
                {hoveredItem === "accessories" && <Dropdown items={dropdownItems.accessories} />}
              </li>
              <li className="nav-item">Shoes</li>
              <li className="nav-item">{"Valentine's Day"}</li>
              <li className="nav-item">We Made Too Much</li>
            </ul>
          </div>


          {/* Icons Section */}
          <div className="icon-section">
            <Link className="icon-link">
              <input type="text" placeholder="Search" name="search" />
              <span className="ddd"><Search /></span>
            </Link>
            <Link to="/profile" className="icon-link">
              <Person />
            </Link>
            <Link to="/wishlist" className="icon-link">
              <Favorite />
            </Link>
            <Link to="/cart" className="icon-link">
              <AddShoppingCart />
            </Link>
          </div>
        </div>
      </header>
    </>

  );
};

// Dropdown Component
const Dropdown = ({ items }) => {
  return (
    <ul className="dropdown-menu">
      {items.map((item, index) => (
        <li key={index} className="dropdown-item">
          {item}
        </li>
      ))}
    </ul>
  );
};

export default Header;