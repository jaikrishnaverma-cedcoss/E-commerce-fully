import React, { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dataHubType } from "../../Types/types";

const HomeNav = ({setCartShow,searchHandler}:{setCartShow:Dispatch<SetStateAction<boolean>>,searchHandler:(x:string)=>void}) => {
  const navigate=useNavigate()
  const dataHub=useSelector((state:dataHubType)=>state)
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark second-bg sticky-top">
        <div className="container">
          <a className="navbar-brand" href="#" onClick={()=>{navigate('/');setCartShow(false)}}>
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
              <li className="nav-item hover--nav">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item hover--nav">
                <a className="nav-link" href="#products-show">
                  Products
                </a>
              </li>
              <li className="nav-item dropdown hover--nav">
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
            <div className="d-flex mx-md-4">
              <div className="input-group input-group-lg ">
                <input
                  type="text"
                  className="form-control bg-light border-end-0"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                  placeholder="Search here..."
                  onChange={(e)=>{searchHandler(e.target.value)}}
                />
                <button
                  className="input-group-text bg-light border-start-0"
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
            </div>
           
            <ul className="navbar-nav mb-2 mb-lg-0">
            
              <li className="nav-item hover--nav py-1" onClick={()=>setCartShow(prev=>!prev)}>
                <i className="bi bi-cart text-white fs-5 mx-4 ">
                {"  "}Cart
                </i>
              </li>
              
              <li className="nav-item hover--nav py-1" onClick={()=>navigate('/auth')}>
              <i className="bi bi-person-circle text-white fs-5 mx-4 ">
                {"  "}{(dataHub.session)?dataHub.session.name:'Log In'}
              </i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="col-12 bg-warning py-1">
        <div className="container d-flex justify-content-center">
          <p className="m-0 fw-bold text-success">20% Instant discount using code #jstark001</p>
        </div>
      </div>
    </>
  );
};

export default HomeNav;
