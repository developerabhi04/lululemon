import { Phone, Email } from "@mui/icons-material";


const ContactSupport = () => {
    return (
        <div className="contact-support-container">
            <div className="contact-support">
                <h2>Contact Support</h2>
                <p className="support-description">
                    If you have any questions or need assistance, please feel free to contact our customer care team. We are here to help!
                </p>
                <div className="support-details">
                    <div className="detail-item">
                        <Phone className="icon" />
                        <div className="detail-text">
                            <h4>Call Us</h4>
                            <p>+1 (800) 123-4567</p>
                        </div>
                    </div>
                    <div className="detail-item">
                        <Email className="icon" />
                        <div className="detail-text">
                            <h4>Email Us</h4>
                            <p>support@example.com</p>
                        </div>
                    </div>
                </div>
                <div className="additional-info">
                    <h4>Hours of Operation</h4>
                    <p>Monday - Friday: 9:00 AM to 6:00 PM</p>
                    <p>Saturday: 10:00 AM to 4:00 PM</p>
                    <p>Sunday: Closed</p>
                </div>
            </div>
        </div>
    );
};

export default ContactSupport;
