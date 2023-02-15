import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useIndexKey from "../../CustomHooks/useIndexKey";
import useIndex from "../../CustomHooks/useUserIndex";
import { addProductInCart, updateProductInCart } from "../../Features/Slice";
import { cartTypes, dataHubType, productsType } from "../../Types/types";
import DataTables from "../body/Pages/DataTables";
import Footer from "../Footer/Footer";
import Hero from "./Hero";
import HomeNav from "./HomeNav";
const Home = () => {
  const dataHub: dataHubType = useSelector((state: dataHubType) => state);
  let [products, setProducts] = useState<productsType[]>(dataHub.products);
  const dispatch = useDispatch();
  // if user is guest user then use this state
  let [filter, setFilter] = useState<any>({});
  let [guestCart, setGuestCart] = useState<any>([]);
  let sessionUserIndex = useIndex();
  let [cartShow, setCartShow] = useState(false);
  let getIndex = useIndexKey();
  let gotToDiv = useRef<HTMLHRElement>(null);
  let selectSort = useRef<HTMLSelectElement>(null);
  let checkArrow = useRef<HTMLInputElement>(null);
  // set products according to filter
  useEffect(() => {
    let flg = false;
    Object.keys(filter).forEach((check: any) => {
      if (filter[check].length > 0) flg = true;
    });
    if (flg) setProducts([...filterer(Object.keys(filter))]);
    else {
      setProducts([...dataHub.products]);
    }
  }, [filter]);

  // scroll to products
  useEffect(() => {
    setTimeout(() => {
      gotToDiv.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 1500);
  }, []);
  // set filter keys and value
  const filterer: any = (
    filterKeys: string[],
    index = 0,
    filteredArr = dataHub.products
  ) => {
    if (index == filterKeys.length) return filteredArr;
    let filters: any = filter;
    let tempArr: any = [];
    let currentKey = filterKeys[index];
    if (filters[currentKey].length == 0)
      return filterer(filterKeys, index + 1, filteredArr);

    filters[currentKey].forEach((val: any) => {
      filteredArr.forEach((obj: any) => {
        if (currentKey === "price") {
          let minMax = val.split("-");
          console.log("minMax", minMax);
          if (
            obj[currentKey] >= parseInt(minMax[0]) &&
            obj[currentKey] <= parseInt(minMax[1])
          )
            tempArr.push(obj);
        } else if (obj[currentKey] == val) tempArr.push(obj);
      });
    });
    return filterer(filterKeys, index + 1, tempArr);
  };

  //sort according selection
  const sorter = (key: string, asc = true) => {
    let sortedArr: any = products;
    const sortLogic: any = (a: any, b: any) => {
      if (isFinite(sortedArr[0][key]))
        return asc ? a[key] - b[key] : b[key] - a[key];
      else {
        if (asc) {
          if (a[key] < b[key]) {
            return -1;
          }
          if (a[key] > [key]) {
            return 1;
          }
        } else {
          if (a[key] < b[key]) {
            return 1;
          }
          if (a[key] > b[key]) {
            return -1;
          }
        }
        return 0;
      }
    };
    products.sort(sortLogic);
    console.log(products);
    setProducts([...products]);
  };
  // making the list of for select filters
  const selectionList: (key: string) => string[] = (key: string) => {
    let arr: string[] = [];
    dataHub.products.map((x: any) => {
      if (!arr.includes(x[key])) arr.push(x[key]);
    });
    return arr;
  };

  //
  const filterHandler = (key: string, val: string) => {
    let currentFilter: any = filter;
    if (currentFilter[key]) {
      let index = currentFilter[key].indexOf(val);
      if (index !== -1) currentFilter[key].splice(index, 1);
      else currentFilter[key] = [...currentFilter[key], val];
    } else currentFilter[key] = [val];
    setFilter({ ...currentFilter });
  };

  // Add to Cart for guest and login both
  const addTocart = (index: number, x: productsType, type = "inc") => {
    if (products[index].stock <= 0) return "";

    if (sessionUserIndex !== -1) {
      let userCart = [...dataHub.users[sessionUserIndex].cart];
      let indexInCart = userCart.findIndex((item) => item.id == x.id);

      if (indexInCart == -1)
        dispatch(
          addProductInCart({
            userIndex: sessionUserIndex,
            obj: {
              id: x.id,
              title: x.title,
              description: x.description,
              price: x.price,
              images: x.images,
              Quantity: 1,
              Total: x.price,
            },
          })
        );
      else if (
        !(
          (type == "inc" &&
            userCart[indexInCart].Quantity + 1 > products[index].stock) ||
          (type == "dec" && userCart[indexInCart].Quantity - 1 < 0)
        )
      ) {
        dispatch(
          updateProductInCart({
            userIndex: sessionUserIndex,
            cartIndex: indexInCart,
            Quantity:
              type == "inc"
                ? userCart[indexInCart].Quantity + 1
                : userCart[indexInCart].Quantity - 1,
          })
        );
      }
    } else {
      let indexInCart = guestCart.findIndex(
        (item: cartTypes) => item.id == x.id
      );
      if (indexInCart == -1 && products[index].stock > 0) {
        guestCart.push({
          id: x.id,
          title: x.title,
          description: x.description,
          price: x.price,
          images: x.images,
          Quantity: 1,
          Total: x.price,
        });
      } else if (
        !(
          (type == "inc" &&
            guestCart[indexInCart].Quantity + 1 > products[index].stock) ||
          (type == "dec" && guestCart[indexInCart].Quantity - 1 < 0)
        )
      ) {
        guestCart[indexInCart].Quantity =
          type == "inc"
            ? guestCart[indexInCart].Quantity + 1
            : guestCart[indexInCart].Quantity - 1;
      }

      setGuestCart([...guestCart]);
    }
  };

  // search results
  const searchHandler = (str: string) => {
    setTimeout(() => {
      gotToDiv.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    if (str == "") setProducts([...dataHub.products]);
    else {
      var result: productsType[] = dataHub.products.filter((item) => {
        let found = false;
        Object.values(item).forEach((x) => {
          if (
            x.toString().toLocaleLowerCase().includes(str.toLocaleLowerCase())
          )
            found = true;
        });
        return found;
      });
      setProducts([...result]);
    }
  };

  const billDetails=()=>{
   let data= sessionUserIndex !== -1
    ? dataHub.users[sessionUserIndex].cart
    : guestCart

   let total=data.reduce((total:number,x:cartTypes)=>total+x.price*x.Quantity,0) 

   return [{name:'Total',value:total},
   {name:'Sub total',value:total},
   {name:'Discount',value:total},
  
  ]
  }
  billDetails()
  if (cartShow)
    return (
      <>
        <HomeNav setCartShow={setCartShow} searchHandler={searchHandler} />
        <div className="d-flex flex-wrap justify-content-around my-2">
          <div className="col-8">
            <DataTables
              table={
                sessionUserIndex !== -1
                  ? dataHub.users[sessionUserIndex].cart
                  : guestCart
              }
              title="Your Cart Details"
              subTitle={
                sessionUserIndex !== -1 ? "Please Login to Save Your Cart." : ""
              }
              deletor={(i: number) => {
                guestCart.splice(i, 1);
                setGuestCart([...guestCart]);
              }}
              counter={addTocart}
            />
          </div>
          <div className="card col-12 col-md-3 border-0 shadow-lg m-4">
            <div className="card-title p-3 mb-2">
              <div className="d-flex justify-content-between">
                <p className="card-title fs-5 n-blue">
                 Bill Details
                  <small className="text-secondary mx-1 fs-6">
                    | Total
                  </small>{" "}
                </p>
                <small className="text-secondary mx-1 fs-6">...</small>
              </div>

              <div className="d-flex ">
              <ul className="list-group border-0 mt-3 col-12 px-1">
 {
  billDetails().map((items:any)=><li className="d-flex mb-2 align-items-center justify-content-between text-secondary">
  <h5 className="mb-0">{items.name}</h5>
  <p className="mb-0"><i className="bi bi-currency-rupee"></i> {items.value}</p>
  </li>)
 }
                </ul>
              
              </div>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <section className="" style={{ height: "100vh", overflowY: "scroll" }}>
      <HomeNav setCartShow={setCartShow} searchHandler={searchHandler} />
      <Hero />
      <div className="container my-5 pt-5">
        {/* Uncomment It */}
        <div className="col-12">
          <h1 className="mt-5">Products Page || Admin Panel Dashboard</h1>
          <p className="lead">
            E-commerce Store with all Important features and maximum controlled
            UI from dataSets. Also Given a dashboard , to open it <br></br>
            <code className="small">Email:</code> jai@gmail.com &{" "}
            <code className="small">Password</code> 2222.<br></br>
            There is three user role exist: <br />
            <code className="small">1.Admin</code>
            <br></br>
            <code className="small">2.Manager</code>
            <br></br>
            <code className="small">3.User</code>
            <br></br>
          </p>
        </div>
        <hr ref={gotToDiv} className="p-4 mb-4" id="products-show" />
        <div className="col-12 d-flex">
          <div className="col-12 col-sm-10 rounded fourth-bg">
            <div className="col-12 ms-4 mt-4">
              {products.length == 0 ? (
                <p className="fs-4 fw-bolder text-danger">No Product Found!</p>
              ) : (
                <p className="fs-4 text-success">
                  {products.length} Products{" "}
                  {products.length == dataHub.products.length
                    ? " Available"
                    : " Found"}
                </p>
              )}
            </div>
            <div className="row row-cols-1 row-cols-md-4 m-2 g-4">
              {products.map((x, index) => (
                <>
                  <div className="col" key={"1_" + x.toString() + index}>
                    <div className="card h-100 product--card">
                      <img
                        style={{ height: "200px" }}
                        src={Array.isArray(x.images) ? x.images[0] : x.images}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                          <h5 className="card-title ">{x.title}</h5>
                          <p
                            className="card-text text-secondary fw-bolder"
                            style={{ fontSize: "12px" }}
                          >
                            {x.description}
                          </p>
                        </div>
                        <div className="col-12 fw-bold d-flex flex-column ">
                          <div className="col-12">
                            <p className="text-secondary m-0">
                              Brand: {x.brand}
                            </p>
                            <p className="text-secondary m-0">
                              Stocks: {x.stock}
                            </p>
                            <p className="text-secondary m-0">
                              Rating: {x.rating + " "}
                              <i className="bi bi-star-fill text-warning"></i>{" "}
                            </p>

                            <p className="text-dark fw-bolder fs-4 m-1 pricer">
                              {x.price}
                              <i className="bi bi-currency-rupee"></i>
                            </p>
                          </div>
                          <div className="col-12 px-3 py-1 rounded third-bg d-flex justify-content-between align-items-center mt-1">
                            <button
                              className="btn fs-5 text-white fw-bold"
                              onClick={() => addTocart(index, x)}
                            >
                              <i className="bi bi-cart-plus-fill me-2"></i>
                              Buy
                            </button>
                            <span className="d-flex align-items-center">
                              <i
                                onClick={() => addTocart(index, x, "dec")}
                                className="bi bi-dash-square text-white  fs-4"
                              ></i>
                              <span className="mx-1">
                                {getIndex(guestCart, "id", x.id) !== -1
                                  ? guestCart[getIndex(guestCart, "id", x.id)]
                                      .Quantity
                                  : 0}
                              </span>
                              <i
                                onClick={() => addTocart(index, x, "inc")}
                                className="bi bi-plus-square text-white fs-4"
                              ></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>

          {/* filterer */}
          <div className="d-none d-sm-block col-2 second-bg rounded p-2">
            <h4 className="text-white my-2">
              <i className="bi bi-filter-left me-1"></i>Filter
            </h4>
            <div className="col-12">
              <label
                htmlFor="sorter"
                className="d-flex justify-content-between text-white fw-bold"
              >
                Sort By
                <div className="form-check form-switch">
                  <input
                    ref={checkArrow}
                    className="form-check-input"
                    onChange={(e) =>
                      selectSort.current?.value &&
                      sorter(selectSort.current?.value, e.target.checked)
                    }
                    type="checkbox"
                    id="flexSwitchCheckChecked"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckChecked"
                  >
                    <i
                      className={`bi bi-arrow-${
                        checkArrow.current?.checked ? "down" : "up"
                      }`}
                    >
                      {checkArrow.current?.checked ? "asc" : "dec"}
                    </i>
                  </label>
                </div>
              </label>
              <select
                ref={selectSort}
                className="form-select col-4"
                id="sorter"
                onChange={(e) => sorter(e.target.value)}
                aria-label="Default select example"
              >
                {/* <option value={-1} >--Sort By--</option> */}
                {products.length > 0 &&
                  Object.keys(products[0]).map(
                    (x) =>
                      x != "id" && x != "tags" && <option value={x}>{x}</option>
                  )}
              </select>
            </div>
            {/* Filter by selections */}
            <hr className="text-white" />
            <h5 className="text-white my-2">
              <i className="bi bi-calendar3-range me-1"></i>
              By Price
            </h5>
            <ul className="list-group filter--list">
              {[
                "0-500",
                "500-1000",
                "1000-2000",
                "2000-5000",
                "5000-100000",
              ].map((x, i) => (
                <li className="list-group-item" key={x.toString() + i + "_1"}>
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    value=""
                    onChange={() => filterHandler("price", x)}
                    aria-label="..."
                  />
                  {x} <i className="bi bi-currency-rupee"></i>
                </li>
              ))}
            </ul>
            {[
              { title: "By Categories", key: "category", icon: "bi-check-all" },
              { title: "By Brands", key: "brand", icon: "bi-postage" },
              {
                title: "By Discount",
                key: "discountPercentage",
                icon: "bi-postage",
              },
            ].map((base, i) => (
              <>
                <hr className="text-white" key={base.toString() + i + "_hr"} />
                <h5
                  className="text-white my-2"
                  key={base.toString() + i + "_h5"}
                >
                  <i className={`bi ${base.icon} me-1`}></i>
                  {base.title}
                </h5>
                <ul
                  className="list-group filter--list"
                  key={base.toString() + i + "_ul"}
                >
                  {selectionList(base.key).map((x, index) => (
                    <li
                      className="list-group-item"
                      key={x.toString() + index + "_li"}
                    >
                      <input
                        className="form-check-input me-1"
                        type="checkbox"
                        value=""
                        onChange={() => {
                          gotToDiv.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                          filterHandler(base.key, x);
                        }}
                        aria-label="..."
                      />
                      {x}
                      {base.key == "discountPercentage" ? " %" : ""}
                    </li>
                  ))}
                  <li className="list-group-item text-danger">
                    No more choices Available
                  </li>
                </ul>
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="col-12 ">
        <Footer />
      </div>
    </section>
  );
};

export default Home;
