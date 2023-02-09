import React, { useState } from "react";
import { useSelector } from "react-redux";
import { dataHubType } from "../../Types/types";
import Footer from "../Footer/Footer";
import Hero from "./Hero";
import HomeNav from "./HomeNav";
const Home = () => {
  const dataHub: dataHubType = useSelector((state: dataHubType) => state);
  let [products, setProducts] = useState(dataHub.products);
  return (
    <>
      <HomeNav />
      <Hero />
      <div className="container my-5 pt-5">
        <div className="col-12">
          <h1 className="mt-5">Products Page || Admin Panel Dashboard</h1>
          <p className="lead">
            E-commerce Store with all Important features and maximum controlled UI from dataSets. Also Given a dashboard{" "} , to open it <br></br>
            <code className="small">Email:</code> jai@gmail.com{" "}&{" "}
            <code className="small">Password</code> 2222.<br></br>
            There is three user role exist: <br />
            <code className="small">1.Admin</code><br></br>
            <code className="small">2.Manager</code><br></br>
            <code className="small">3.User</code><br></br>

          </p>
        </div>
        <div className="col-12">
          <div className="row row-cols-1 row-cols-md-4 m-2 g-4">
            {products.map((x) => (
              <div className="col">
                <div className="card h-100">
                  <img
                    style={{ height: "200px" }}
                    src={Array.isArray(x.images) ? x.images[0] : x.images}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title ">{x.title}</h5>
                      <p className="card-text">{x.description}</p>
                    </div>
                    <button className="btn btn-success rounded col-12 fw-bold fs-5 d-flex justify-content-between mt-4">
                      <span>
                        <i className="bi bi-cart-plus-fill me-2"></i>
                        Add to Cart
                      </span>
                      <span>
                        <i className="bi bi-dash-square text-white"></i>
                        <span className="mx-2">5</span>
                        <i className="bi bi-plus-square text-white"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-12 bg-success">
        <Footer />
      </div>
    </>
  );
};

export default Home;
