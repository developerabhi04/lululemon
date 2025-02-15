import { BsSearch } from "react-icons/bs";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import { FaRegBell } from "react-icons/fa";
import UserImg from "../../assets/userpic.png";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import data from "../../assets/data.json";
import { BarChart, DoughnutChart } from "../../Components/Admin/Chart";
import { BiMaleFemale } from "react-icons/bi";
import DashboardTable from "../../Components/Admin/DashboardTable";



const AdminDashboard = () => {
    return (
        <div className="admin-container">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main */}
            <main className="dashboard">
                {/* Bar */}
                <div className="bar">
                    <BsSearch />
                    <input type="text" placeholder="Search for data, users, docs" />
                    <FaRegBell />
                    <img src={UserImg} alt="User" />
                </div>

                {/* Section 1 */}
                <section className="widget-container">
                    <WidgetItem
                        percent={40}
                        amount={true}
                        value={34000}
                        heading={"Revenue"}
                        color={"rgb(0, 115, 255)"}
                    />
                    <WidgetItem
                        percent={-14}
                        value={4000}
                        heading={"User"}
                        color={"rgb(0, 198, 202)"}
                    />
                    <WidgetItem
                        percent={80}
                        value={3400000}
                        heading={"Transactions"}
                        color={"rgb(225, 196, 0)"}
                    />
                    <WidgetItem
                        percent={40}
                        amount={true}
                        value={3400000}
                        heading={"Products"}
                        color={"rgb(76 0 255)"}
                    />
                </section>

                {/* Graph 2 */}
                <section className="graph-container">
                    <div className="revenue-chart">
                        <h2>Revenue & Transaction</h2>
                        <BarChart
                            data_1={[300, 144, 433, 655, 237, 755, 190]}
                            data_2={[200, 444, 343, 556, 778, 445, 990]}
                            title_1={"Revenue"}
                            title_2={"Transaction"}
                            bgColor_1={"rgb(0, 115, 255)"}
                            bgColor_2={"rgb(53, 162, 235, 0.8)"}
                        />
                    </div>

                    <div className="dashboard-categories">
                        <h2>Inventory</h2>
                        <div>
                            {data.categories.map((i) => (
                                <CategoryItem
                                    key={i.heading}
                                    heading={i.heading}
                                    value={i.value}
                                    color={`hsl(${i.value * 4}, ${i.value}%, 50%)`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 3 */}
                <section className="transaction-container">
                    <div className="gender-chart">
                        <h2>Gender Ratio</h2>
                        <DoughnutChart
                            labels={["Female", "Male"]}
                            data={[12, 19]}
                            backgroundColor={["hsl(340, 82%, 56%)", "rgba(53, 162, 235, 0.8)"]}
                            cutout={78}
                        />
                        <p>
                            <BiMaleFemale />
                        </p>
                    </div>

                    {/* Table */}
                    <DashboardTable data={data.transaction} />
                </section>
            </main>
        </div>
    );
};


// WidgetItem Component
const WidgetItem = ({ heading, value, percent, color, amount = false }) => (
    <article className="widget">
        <div className="widget-info">
            <p>{heading}</p>
            <h4>{amount ? `$${value}` : value}</h4>
            {percent > 0 ? (
                <span className="green">
                    <HiTrendingUp /> + {percent}%{" "}
                </span>
            ) : (
                <span className="red">
                    <HiTrendingDown /> - {percent}%{" "}
                </span>
            )}
        </div>

        <div
            className="widget-circle"
            style={{
                background: `conic-gradient(${color} ${(Math.abs(percent) / 100) * 360}deg, rgb(255, 255, 255) 0)`,
            }}
        >
            <span style={{ color }}>{percent}%</span>
        </div>
    </article>
);

// CategoryItem Component
const CategoryItem = ({ color, value, heading }) => (
    <div className="category-item">
        <h5>{heading}</h5>
        <div>
            <div
                style={{
                    backgroundColor: color,
                    width: `${value}%`,
                }}
            ></div>
        </div>
        <span>{value}%</span>
    </div>
);

export default AdminDashboard;
