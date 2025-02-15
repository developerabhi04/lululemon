import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../../assets/category/na_Dec24_Q4_AppMerchandising_W_Hoodies_ShopCategories.webp";
import img2 from "../../../assets/category/na_Dec24_Q4_AppMerchandising_W_Pants_ShopCategories.webp";
import img3 from "../../../assets/category/na_Dec24_Q4_AppMerchandising_W_Shirts_ShopCategories.webp";
import img4 from "../../../assets/category/na_Dec24_Q4_AppMerchandising_W_Shoes_ShopCategories.webp";
import img5 from "../../../assets/category/na_Dec24_Q4_AppMerchandising_W_Bags_ShopCategories.webp";
import img6 from "../../../assets/category/na_Dec24_Q4_AppMerchandising_W_Coats_ShopCategories.webp";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"; // Import MUI Icons

const categories = [
    { id: 1, name: "Hoodies & Sweatshirts", image: img1 },
    { id: 2, name: "Pants", image: img2 },
    { id: 3, name: "Shirts", image: img3 },
    { id: 4, name: "Shoes", image: img4 },
    { id: 5, name: "Bags", image: img5 },
    { id: 6, name: "Coats & Jackets", image: img6 },
];

// Custom Arrow Components
const NextArrow = ({ onClick }) => (
    <div className="arrow next" onClick={onClick}>
        <ArrowForwardIos />
    </div>
);

const PrevArrow = ({ onClick }) => (
    <div className="arrow prev" onClick={onClick}>
        <ArrowBackIos />
    </div>
);

const Category = ({ showHeading, showBar }) => {
    const navigateUrl = useNavigate();

    const settings = {
        dots: false,
        infinite: true,
        // speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    const navigateLink = () => {
        window.scrollTo(0, 0)
        navigateUrl("/products");
    };

    return (
        <section className="category-section">
            {showHeading && <h1>Shop popular categories.</h1>}

            {showBar && <div className="bar"></div>}

            <div className="category-container">
                <div>
                    <Slider {...settings}>
                        {categories.map((category) => (
                            <div key={category.id} className="category-card" onClick={navigateLink}>
                                <Link to="/">
                                    <img src={category.image} alt={category.name} className="category-img" />
                                </Link>
                                <p className="category-name">{category.name}</p>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Category;
