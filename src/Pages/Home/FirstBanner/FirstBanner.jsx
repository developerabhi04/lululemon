import img1 from "../../../assets/9 (1).png";
import img2 from "../../../assets/8 (1).png"

const FirstBanner = () => {
    return (
        <section className="first-banner">
            <div className="container">
                <div className="img-one">
                    <img src={img1} alt="Banner" />
                </div>
                <div className="img-one">
                    <img src={img2} alt="Banner" />
                </div>
            </div>
        </section>
    )
}

export default FirstBanner