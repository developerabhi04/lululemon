import { Facebook, Instagram, Mail, Phone, X, YouTube } from '@mui/icons-material'


const TopNav = ({showTopNav, companys}) => {
  return (
    <>
          {showTopNav && (
              <nav className="wapper-header">
                  {companys.map((com, index) => (
                      <div className="nav" key={index}>
                          <div className="nav-div">
                              <ul className="nav-ul">
                                  <li className="nav-li">
                                      <Phone />
                                      <span className="nav-span">{com?.phone || ""}</span>
                                  </li>
                                  <li className="nav-li">
                                      <Mail />
                                      <span className="nav-span">{com?.email}</span>
                                  </li>
                              </ul>
                          </div>
                          <div className="social-div">
                              <ul className="social-media">
                                  <li className="link">
                                      <a href={com.facebook} target="_blank" rel="noopener noreferrer">
                                          <Facebook />
                                      </a>
                                  </li>
                                  <li className="link">
                                      <a href={com.instagram} target="_blank" rel="noopener noreferrer">
                                          <Instagram />
                                      </a>
                                  </li>
                                  <li className="link">
                                      <a href={com.twitter} target="_blank" rel="noopener noreferrer">
                                          <X />
                                      </a>
                                  </li>
                                  <li className="link">
                                      <a href={com.linkedin} target="_blank" rel="noopener noreferrer">
                                          <YouTube />
                                      </a>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  ))}
              </nav>
          )}
    </>
  )
}

export default TopNav