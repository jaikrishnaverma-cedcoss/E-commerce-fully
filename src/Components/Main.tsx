import React, { useEffect } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import {  Route, Routes } from "react-router-dom";
import LoginSignup from "../AuthComponents/LoginSignup";
import { deleteFunc, setAll } from "../Features/Slice";
import { dataHubType } from "../Types/types";
import Body from "./body/Body";
import AddProduct from "./body/Pages/AddProduct";
import Dashboard from "./body/Pages/Dashboard";
import DataTables from "./body/Pages/DataTables";
import ErrorPage from "./body/Pages/ErrorPage";
import Nav from "./Head/Nav";
import Home from "./LandingPage/Home";

const Main = () => {
  const dataHub: dataHubType = useSelector((state: dataHubType) => state);
  const dispatch = useDispatch();

useEffect(() => {
    if (localStorage.getItem("EComm")!=null){
      let x:string|null=localStorage.getItem("EComm")
    if(x!=null)
    dispatch(setAll({...JSON.parse(x)}))
  }
}, [])

//   update localstorage when redux state change
useEffect(() => {
    setTimeout(() => {
        localStorage.setItem("EComm", JSON.stringify(dataHub));
    }, 3)
}, [dataHub])


  console.log("check state=>",dataHub)
  return (
    <>
      <div className="vh-100 ">
        <ProSidebarProvider>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Auth" element={<LoginSignup />} />
            <Route path="Dashboard" element={<Body />}>
                <Route path='/Dashboard' element={<Dashboard/>} />
                <Route path='Add_Product' element={<AddProduct   inputs = {dataHub.panelView.forms.product}  objKey='products' />} />
                <Route path='List_Products' element={<DataTables   table = {dataHub.products} title="Products" subTitle="" deletor={(i:number)=>{dispatch(deleteFunc({key:'products',index:i}))}}/>}/>
                <Route path='*' element={<ErrorPage errors=""/>} />
            </Route>
          </Routes>
          
        </ProSidebarProvider>
      </div>
    </>
  );
};

export default Main;
