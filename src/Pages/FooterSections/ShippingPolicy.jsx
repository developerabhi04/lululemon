

const ShippingPolicy = () => {
    return (
        <div className="shipping-policy">
            <h1 className="title">Shipping Policy</h1>
            <p className="intro">
                At <strong>YourStore</strong>, we strive to provide you with the best shipping experience. Below, you'll find details about our shipping policies.
            </p>

            <div className="policy-content">
                <section className="section">
                    <h2>Shipping Methods and Costs</h2>
                    <p>
                        We offer multiple shipping options to ensure you receive your order as quickly and affordably as possible.
                    </p>
                    <table className="shipping-table">
                        <thead>
                            <tr>
                                <th>Shipping Method</th>
                                <th>Estimated Delivery Time</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Standard Shipping</td>
                                <td>5-7 Business Days</td>
                                <td>$5.99</td>
                            </tr>
                            <tr>
                                <td>Express Shipping</td>
                                <td>2-3 Business Days</td>
                                <td>$14.99</td>
                            </tr>
                            <tr>
                                <td>Overnight Shipping</td>
                                <td>1 Business Day</td>
                                <td>$29.99</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="section">
                    <h2>International Shipping</h2>
                    <p>
                        We ship worldwide. Please note that international shipping rates vary based on destination and package weight.
                    </p>
                    <p>
                        For international orders, customers are responsible for customs duties and taxes.
                    </p>
                </section>

                <section className="section">
                    <h2>Shipping Restrictions</h2>
                    <p>
                        We do not ship to PO boxes or APO/FPO addresses.
                    </p>
                    <p>
                        Certain products may be restricted from shipping to specific countries due to local regulations.
                    </p>
                </section>

                <section className="section">
                    <h2>Tracking and Delivery</h2>
                    <p>
                        Once your order is shipped, you will receive a tracking number via email.
                    </p>
                    <p>
                        If your package is lost or damaged during transit, please contact our customer service for assistance.
                    </p>
                </section>

                <section className="section">
                    <h2>Return Policy</h2>
                    <p>
                        For details on returns and exchanges, please visit our <a href="/return-policy">Return Policy</a> page.
                    </p>
                </section>
            </div>

            <footer className="footer">
                Last updated: March 16, 2025
            </footer>
        </div>
    );
};

export default ShippingPolicy;
