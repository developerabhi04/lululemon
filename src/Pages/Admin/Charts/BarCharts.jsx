import AdminSidebar from "../../../Components/Admin/AdminSidebar";
import { BarChart } from "../../../Components/Admin/Chart";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
];

const BarCharts = () => {
    return (
        <div className="admin-container">
            <AdminSidebar />

            <main className="chart-container">
                <h1>Bar Charts</h1>
                <section>
                    <BarChart
                        horizontal={false}
                        data_1={[200, 444, 555, 666, 777, 888, 902]}
                        data_2={[300, 144, 897, 789, 334, 890, 909]}
                        title_1="Products"
                        title_2="Users"
                        bgColor_1={`hsl(260, 50%, 30%)`}
                        bgColor_2={`hsl(360, 90%, 90%)`}
                    />
                    <h2>TOP SELLING PRODUCTS & TOP CUSTOMERS</h2>
                </section>

                <section>
                    <BarChart
                        horizontal={true}
                        data_1={[200, 444, 344, 555, 666, 444, 543, 777, 455, 888, 546, 902]}
                        data_2={[]}
                        title_1="Products"
                        title_2=""
                        bgColor_1={`hsl(180, 40%, 50%)`}
                        bgColor_2=""
                        labels={months}
                    />
                    <h2>Order Through The Year</h2>
                </section>
            </main>
        </div>
    );
};

export default BarCharts;
