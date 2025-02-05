import img1 from "../../../assets/na_jan25_wk4_W_OTM_1_2_Lg_MediaAction_D_Pants.webp";
import img2 from "../../../assets/na_jan25_wk4_W_OTM_1_2_Lg_MediaAction_D_Casual.webp"

const SecondBanner = () => {
    return (
        <section className="second-banner">
            <h1>Daydrift™ fits are flexible.</h1>
            <div className="second-container">
                <div className="second-img-one">
                    <img src={img1} alt="Banner" />

                    <div className="content-one">
                        <h1>Break the rules.</h1>
                        <p>Meet Daydrift™, a tailored trouser that stretches the imagination.</p>

                        <div className="content-button">
                            <button>Shop pants</button>
                            <button>Shop Daydrift™ Trousers</button>
                        </div>
                    </div>


                </div>

                <div className="second-img-one">
                    <img src={img2} alt="Banner" />

                    <div className="content-one">
                        <h1>Practically unstoppable.</h1>
                        <p>In these soft, stretchy layers, you’re comfortable enough to do almost anything.</p>

                        <div className="content-button">
                            <button>Shop Spring Preview</button>
                        </div>
                    </div>


                </div>
            </div>
        </section>
    )
}

export default SecondBanner