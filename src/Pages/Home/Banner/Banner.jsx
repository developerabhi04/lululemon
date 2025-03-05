import { Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // Import Autoplay module
import "swiper/css";
import "swiper/css/pagination";

import banner1 from "../../../assets/banner/IMG_5480 copy.jpg";
import banner2 from "../../../assets/banner/IMG_5481 copy.jpg" // Add more images
import { FaShippingFast, FaTags, FaShieldAlt } from "react-icons/fa";

const Banner = () => {
    return (
        <section className="banner-section">
            <div className="banner-container">
                {/* 🚀 Left Content Section */}
                <div className="banner-content">
                    <h1>
                        Discover <span>Trendy Fashion</span> & More
                    </h1>
                    <p>
                        Upgrade your wardrobe with exclusive fashion collections, best prices, and fast delivery—curated just for you.
                    </p>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            href="/collection"
                            className="banner-btn"
                        >
                            Shop Now
                        </Button>
                    </div>

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

                {/* 🖼️ Right Image Section - Infinite Slider */}
                <div className="banner-image">
                    <Swiper
                        modules={[Pagination, Autoplay]} // Added Autoplay
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        loop={true} // Enables infinite looping
                        autoplay={{
                            delay: 2500, // Adjust delay for smooth transitions
                            disableOnInteraction: false, // Keeps autoplay running even after user interaction
                        }}
                        speed={800} // Smooth transition speed
                    >
                        <SwiperSlide>
                            <img src={banner1} alt="Fashion Slide 1" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={banner2} alt="Fashion Slide 2" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Banner;