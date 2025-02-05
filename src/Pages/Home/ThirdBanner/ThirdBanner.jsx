import img1 from "../../../assets/NA_JAN25_Membership_EA_LD_BAU_Launch_Ecomm_1_1_Med_MediaAction_D_V2.webp";
import img2 from "../../../assets/na_jan25_wk4_W_OTM_CDP_Hero_D_AccessoriesBags (1).webp";
import img3 from "../../../assets/NA_JAN25_HMD24_JanEvent_Ecomm_Homepage_0_8_BrandStatement_D.webp";

const ThirdBanner = () => {
    return (
        <section className="third-banner">
            <div className="container">
                <img src={img1} alt="banner" />


                <div className="new-to-website">
                    <div className="row">
                        <div>
                            <h2>New to the website?</h2>
                        </div>

                        <div>
                            <h2>Get familiar, get inspired, and get moving.</h2>
                        </div>

                        <div>
                            <button>Start Here</button>
                        </div>
                    </div>
                </div>

                <img src={img2} alt="banners" />

                <div className="bags-content">
                    <h1>Essentially effortless.</h1>
                    <p>The Leather Alternative Mini Bag - storage and style for everywhere you go.</p>
                    <button>Shop bags</button>
                </div>

{/* section img3 */}
                <div className="img3">
                    <img src={img3} alt="banners" />
                    <div className="contents">
                        <h1>Essentially effortless.</h1>
                        <p>The Leather Alternative Mini Bag - storage and style for everywhere you go.</p>
                        <button>Shop bags</button>
                    </div>

                </div>



            </div>


        </section>
    )
}

export default ThirdBanner