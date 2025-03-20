import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../../redux/slices/categorySlices";
import Skeleton from "@mui/material/Skeleton";

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

const Category = ({ showHeading = true, showBar = true }) => {
    const dispatch = useDispatch();
    const navigateUrl = useNavigate();

    const { categories, loading } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
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
        window.scrollTo(0, 0);
        navigateUrl("/products");
    };

    return (
        <section className="category-section">
            {showHeading && <h1>Shop popular categories.</h1>}

            {showBar && <div className="bar"></div>}

            <div className="category-container">
                <div>
                    {loading ? (
                        <div className="category-skeleton">
                            {[...Array(5)].map((_, index) => (
                                <Skeleton key={index} variant="rectangular" width={200} height={200} />
                            ))}
                        </div>
                    ) : (
                        <Slider {...settings}>
                            {categories.map((category) => (
                                <div key={category._id} className="category-card" onClick={navigateLink}>
                                    <Link to="/">
                                        <img
                                            src={category.photos?.[0]?.url || "default-placeholder.jpg"}
                                            alt={category.name}
                                            className="category-img"
                                        />
                                    </Link>
                                    <p className="category-name">{category.name}</p>
                                </div>
                            ))}
                        </Slider>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Category;
