import React, { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

const HomeNav = ({setCartShow}:{setCartShow:Dispatch<SetStateAction<boolean>>}) => {
  const navigate=useNavigate()
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark second-bg sticky-top">
        <div className="container">
          <a className="navbar-brand" href="#" onClick={()=>navigate('/')}>
          <img src="376-3768060_stark-industries-logo.png" alt="logo" style={{maxWidth:'100px'}}/>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#products-show">
                  Products
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex mx-md-4">
              <div className="input-group input-group-lg ">
                <input
                  type="text"
                  className="form-control bg-light"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                  placeholder="Search here..."
                />
                <button
                  className="input-group-text bg-light"
                  id="inputGroup-sizing-lg"
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
              {/* <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-light" type="submit">
                Search
              </button> */}
            </form>
           
            <ul className="navbar-nav mb-2 mb-lg-0">
            
              <li className="nav-item" onClick={()=>setCartShow(prev=>!prev)}>
                <i className="bi bi-cart text-white fs-2 mx-4"></i>
              </li>
              <li className="nav-item" onClick={()=>navigate('/auth')}>
              <i className="bi bi-person-circle text-white fs-2 mx-4 "></i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="col-12 bg-warning py-1">
        <div className="container">wqerqwrwer</div>
      </div>
    </>
  );
};

export default HomeNav;
