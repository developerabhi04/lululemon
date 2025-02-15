import { Call, Facebook, Instagram, Mail, X, YouTube } from '@mui/icons-material';
import img1 from "../../assets/Fem-Cartel-Wording-1400x352.png"


const Footer = () => {
  return (
    <>
      <div className="footer-section">
        <div className="footer-container">

          {/* get-in-touch */}
          <div className="footer-get-in-touch">

            <ul>
              <h1>Contact Us</h1>
              <li>
                {/*1 */}
                <span>We’d love to hear from you! For inquiries,
                  collaborations, or support,
                  feel free to reach out using the details below.
                </span>
              </li>

              {/* 2 */}
              <h1>General Inquiries:</h1>
              <li>
                <Mail />Email:
                <span>info@example.com</span>
              </li>

              <li>
                <Call />Phone:
                <span>(+139) 353-1107,</span>
              </li>

              {/* 3 */}
              <h1>Customer Support:</h1>
              <li>
                <Mail />Email:
                <span>support@femcartel.com</span>
              </li>

              <li>
                <Call />Phone
                <span>(+139) 353-1107</span>
              </li>

              <li>
                <span>Support hours: Monday - Friday | 9:00 AM - 6:00 PM (EST)</span>
              </li>


              {/* 4 */}
              <h1>Press & Media:</h1>
              <li>
                <Mail /> Email:
                <span>media@femcartel.com</span>
              </li>

              <li>
                <span>For interviews, press releases, and media-related inquiries.</span>
              </li>

              {/* 5 */}
              <h1>Collaborations & Partnerships:</h1>
              <li>
                <Mail /> Email:
                <span>partnership@femcartel.com</span>
              </li>

              <li>
                <span>Interested in collaborating? {"Let’s"} create something amazing together.</span>
              </li>
            </ul>
          </div>

          {/* categories */}
          <div className="footer-categories">
            <h1>Help</h1>
            <ul>
              <li>FAQ</li>
              <li>Accessibility Statement</li>
              <li>Services</li>
              <li>Ordering</li>
              <li>Shipping Policy</li>
              <li>Sizing</li>
              <li>Redeem Gift Cards</li>
            </ul>
          </div>

          {/* our-policy */}
          <div className="footer-policy">
            <h1>My Account</h1>
            <ul>
              <li>Sign In</li>
              <li>Register</li>
              <li>Cart</li>
            </ul>
          </div>



          {/* follow-us */}
          <div className="footer-follow-us">
            <h1>Our Products</h1>
            <ul>
              <li>
                <span>About Us</span>
              </li>
              <li>
                <span>Our Business</span>
              </li>
              <li>
                <span>Media</span>
              </li>
              <li>
                <span>Investor</span>
              </li>
              <li>
                <span>Strategic Sale</span>
              </li>
              <li>
                <span>Affiliates and Creators</span>
              </li>
              <li>
                <span>Contact Us</span>
              </li>
              <li>
                <span>Customer Service</span>
              </li>

            </ul>

            <h1>Follow Us</h1>
            <ul>
              <li>
                <Facebook />
                <span>Meta</span>
              </li>
              <li>
                <X />
                <span>Twitter-X</span>
              </li>
              <li>
                <Instagram />
                <span>Instagram</span>
              </li>
              <li>
                <YouTube />
                <span>Youtube</span>
              </li>
            </ul>
          </div>
        </div>

        <div className='footer-copyright'>
          <div className='footers-container'>
            {/* right */}
            <div className='footer-copyright-right'>
              <ul>
                <li>
                  <img src={img1} />
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className='footer-copyright'>
          <p>Copyright © 2025. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default Footer