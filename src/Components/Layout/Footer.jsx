import { Call, Facebook, Home, Instagram, Mail, X, YouTube } from '@mui/icons-material';
import img1 from "../../assets/payment/img-1.png"
import img2 from "../../assets/payment/img-2.png"
import img3 from "../../assets/payment/img-3.png"
import img4 from "../../assets/payment/img-4.png"
import img5 from "../../assets/payment/img-5.png"
import img6 from "../../assets/payment/img-6.png"

const Footer = () => {
  return (
    <>
      <footer className="footer-section">

        <div className="footer-container">

          {/* categories */}
          <div className="footer-categories">
            <h1>CATEGORIES</h1>
            <ul>
              <li>Shirt</li>
              <li>Shoes</li>
              <li>Bag</li>
              <li>Jeans</li>
              <li>Hoodies</li>
            </ul>
          </div>

          {/* our-policy */}
          <div className="footer-policy">
            <h1>OUR POLICY</h1>
            <ul>
              <li>Contact</li>
              <li>About</li>
              <li>Shop</li>
              <li>Terms & Condition</li>
              <li>Privacy & Policy</li>
            </ul>
          </div>

          {/* get-in-touch */}
          <div className="footer-get-in-touch">
            <h1>GET IN TOUCH</h1>
            <ul>
              <li>
                <Home />
                <span>Davis Patrick
                  P.O. Box 147 2546 Sociosqu Rd.
                  Bethlehem Utah 02913</span>
              </li>

              <li>
                <Mail />
                <span>info@example.com</span>
              </li>

              <li>
                <Call />
                <span>(+139) 353-1107,</span>
              </li>
            </ul>
          </div>

          {/* follow-us */}
          <div className="footer-follow-us">
            <h1>FOLLOW US</h1>
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
            {/* left */}
            <div className='footer-copyright-left'>
              <p>Copyright © 2025. All Rights Reserved.</p>
            </div>

            {/* right */}
            <div className='footer-copyright-right'>
              <p>Payment:</p>
              <ul>
                <li>
                  <img src={img1} />
                </li>
                <li>
                  <img src={img2} />
                </li>
                <li>
                  <img src={img3} />
                </li>
                <li>
                  <img src={img4} />
                </li>
                <li>
                  <img src={img5} />
                </li>
                <li>
                  <img src={img6} />
                </li>
              </ul>
            </div>
          </div>
        </div>

      </footer>
    </>
  )
}

export default Footer