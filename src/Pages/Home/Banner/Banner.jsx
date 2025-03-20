import { Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { FaShippingFast, FaTags, FaShieldAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBanners } from "../../../redux/slices/bannerSlices";

const Banner = () => {
    const dispatch = useDispatch();
    const { banners } = useSelector((state) => state.banners);

    useEffect(() => {
        dispatch(fetchBanners());
    }, [dispatch]);

    return (
        <section className="banner-section">
            <div className="banner-container">
                {/* 🚀 Left Content Section */}
                <div className="banner-content">
                    {banners.map((banner) => (
                        <div key={banner._id}>
                            <h1>
                                <span>{banner.headingOne}</span>
                            </h1>
                            <p>{banner.paragraph}</p>
                            <Button
                                variant="contained"
                                color="primary"
                                href="/collection"
                                className="banner-btn"
                            >
                                Shop Now
                            </Button>

                            {/* 🔥 Feature Section */}
                            <div className="feature-container">
                                <div className="feature-item">
                                    <FaShippingFast className="feature-icon" />
                                    <p>Free & Fast Delivery</p>
                                </div>
                                <div className="feature-item">
                                    <FaTags className="feature-icon" />
                                    <p>Best Prices Guaranteed</p>
                                </div>
                                <div className="feature-item">
                                    <FaShieldAlt className="feature-icon" />
                                    <p>Secure Payments</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 🖼️ Right Image Section - Infinite Slider */}
                <div className="banner-image">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        speed={800}
                    >
                        {banners.flatMap((banner) =>
                            banner.photos.map((photo, index) => (
                                <SwiperSlide key={photo._id}>
                                    <img
                                        src={photo.url}
                                        alt={`Fashion Slide ${index + 1}`}
                                        className="banner-img"
                                    />
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Banner;
