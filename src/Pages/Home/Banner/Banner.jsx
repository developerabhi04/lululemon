import { useState, useEffect } from "react";
import { Slider } from "6pp";
import { Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import banner1 from "../../../assets/banner/6.png";
import banner2 from "../../../assets/banner/7.png";

const banners = [
    {
        src: banner2,
        alt: "Banner 1",
        title: "Favourite Brands",
        description: "Discover the latest trends and redefine your fashion game with our exclusive women’s collection.",
        buttonText: "Get Started",
        buttonLink: "/GET COLLECTION",
        icon: null,
    },
    {
        src: banner1,
        alt: "Banner 2",
        title: "Exclusive Deals",
        description: "Up to 50% OFF on top brands! Don't miss out on the hottest deals in town.",
        buttonText: "Join Now",
        buttonLink: "/signup",
        icon: <ArrowForward />,
    }
];

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const autoplayDuration = 4500; // Sync with slider

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, autoplayDuration);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="banner-section">
            <div className="banner-container">
                {/* Banner Slider */}
                <Slider
                    autoplay
                    autoplayDuration={autoplayDuration}
                    showNav={false}
                    showDots={true}
                    images={banners.map((banner) => banner.src)}
                    alt={banners.map((banner) => banner.alt)}
                    onSlideChange={(index) => setCurrentIndex(index)}
                />

                {/* Dynamic Content with Framer Motion */}
                <div className="banner-content">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex} // Ensure smooth transitions when changing content
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <motion.h1
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                {banners[currentIndex].title}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                            >
                                {banners[currentIndex].description}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    href={banners[currentIndex].buttonLink}
                                    className="banner-btn"
                                    endIcon={banners[currentIndex].icon}
                                    component={motion.button}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    {banners[currentIndex].buttonText}
                                </Button>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Banner;
