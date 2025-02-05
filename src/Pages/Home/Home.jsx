
import Banner from "./Banner/Banner"
import Category from "./Category/Category"
import FirstBanner from "./FirstBanner/FirstBanner"
import NewArrivalProduct from "./HomeNewArrivalProduct/NewArrivalProduct"
import SecondBanner from "./SecondBanner/SecondBanner"
import ThirdBanner from "./ThirdBanner/ThirdBanner"



const Home = () => {
    return (
        <>
            <Banner />
            {/* <FirstBanner /> */}
            <NewArrivalProduct />
            <SecondBanner />
            <Category />
            <ThirdBanner />
        </>
    )
}

export default Home