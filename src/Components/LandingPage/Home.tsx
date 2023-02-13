import { CallTracker } from "assert";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useIndexKey from "../../CustomHooks/useIndexKey";
import useIndex from "../../CustomHooks/useUserIndex";
import { addProductInCart, updateProductInCart } from "../../Features/Slice";
import { cartTypes, dataHubType, productsType } from "../../Types/types";
import AddProduct from "../body/Pages/AddProduct";
import DataTables from "../body/Pages/DataTables";
import Footer from "../Footer/Footer";
import Hero from "./Hero";
import HomeNav from "./HomeNav";
const Home = () => {
  const dataHub: dataHubType = useSelector((state: dataHubType) => state);
  let [products, setProducts] = useState(dataHub.products);
  const dispatch = useDispatch();
  // if user is guest user then use this state
  let [filter, setFilter] = useState<any>({});
  let [guestCart, setGuestCart] = useState<any>([]);
  let sessionUserIndex = useIndex();
  let [cartShow,setCartShow]=useState(false)
  let getIndex=useIndexKey()
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

  const addTocart = (index: number, x: productsType, type='inc') => {
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
      else
        dispatch(
          updateProductInCart({
            userIndex: sessionUserIndex,
            cartIndex: indexInCart,
            Quantity:(type=='inc')?userCart[indexInCart].Quantity + 1:userCart[indexInCart].Quantity - 1,
          })
        );
    } else {
      let indexInCart = guestCart.findIndex(
        (item: cartTypes) => item.id == x.id
      );
      if (indexInCart == -1) {
        guestCart.push({
          id: x.id,
          title: x.title,
          description: x.description,
          price: x.price,
          images: x.images,
          Quantity: 1,
          Total: x.price,
        });
      } else
        guestCart[indexInCart].Quantity = (type=='inc')?guestCart[indexInCart].Quantity + 1:guestCart[indexInCart].Quantity - 1;
      setGuestCart([...guestCart]);
    }
  };

  if(cartShow)
  return <>
    <HomeNav setCartShow={setCartShow} />
   <div className="d-flex justify-content-center my-2">
   <DataTables table={(sessionUserIndex !== -1)?dataHub.users[sessionUserIndex].cart:guestCart} title='Your Cart Details' subTitle={(sessionUserIndex !== -1)?'Please Login to Save Your Cart.':''} deletor={(i:number)=>{guestCart.splice(i,1);setGuestCart([...guestCart])}}/> 
   </div>
    {/* = ({ table, title ,subTitle ,deletor}: any)  */}
  </>


  return (
    <section className="" style={{ height: "100vh", overflowY: "scroll" }}>
      <HomeNav setCartShow={setCartShow} />
      <Hero />
      <div className="container-fluid my-5 pt-5">
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
        <div className="col-12 d-flex " id="products-show">
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
                  <div className="col" key={'1_'+x.toString()+index}>
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
                        <div className="col-12 fw-bold fs-5 d-flex flex-column ">
                          <div className="col-12">
                            <p className="text-dark fw-bolder fs-4 m-1 pricer">
                              {x.price}
                              <i className="bi bi-currency-rupee"></i>
                            </p>
                          </div>
                          <div className="col-12 px-3 py-2 rounded third-bg d-flex justify-content-between align-items-center mt-1">
                            <button
                              className="btn btn-outline-light"
                              onClick={() => addTocart(index, x)}
                            >
                              <i className="bi bi-cart-plus-fill me-2"></i>
                              Add to Cart
                            </button>
                            <span>
                              <i  onClick={() => addTocart(index, x, 'dec')} className="bi bi-dash-square text-white  fs-4"></i>
                              <span className="mx-1">{(getIndex(guestCart,'id',x.id)!==-1)?guestCart[getIndex(guestCart,'id',x.id)].Quantity:0}</span>
                              <i  onClick={() => addTocart(index, x, 'inc')} className="bi bi-plus-square text-white fs-4"></i>
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
              ].map((x,i) => (
                <li className="list-group-item" key={x.toString()+i+'_1'}>
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
            ].map((base,i) => (
              <>
                <hr className="text-white" key={base.toString()+i+'_hr'} />
                <h5 className="text-white my-2" key={base.toString()+i+'_h5'}>
                  <i className={`bi ${base.icon} me-1`}></i>
                  {base.title}
                </h5>
                <ul className="list-group filter--list" key={base.toString()+i+'_ul'}>
                  {selectionList(base.key).map((x,index) => (
                    <li className="list-group-item" key={x.toString()+index+'_li'}>
                      <input
                        className="form-check-input me-1"
                        type="checkbox"
                        value=""
                        onChange={() => {
                          document
                            .querySelector("#products-show")
                            ?.scrollIntoView({
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
