import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'
import { setAll } from '../../Features/Slice'
import Footer from '../Footer/Footer'
import { SideBar } from '../Sidebar/SideBar'
import Dashboard from './Pages/Dashboard'
import { MyState } from '../MyTypescript'
import AddProduct from './Pages/AddProduct'
import DataTables from './Pages/DataTables'
import ListProducts from './Pages/ListProducts'
import { dataHubType } from '../../Types/types'

const Body = () => {
  const dataHub:dataHubType=useSelector((state:dataHubType)=>state)
  const dispatch=useDispatch()
  const location = useLocation();

      // if local storage exist then no need to fetch api
      useEffect(() => {
        if (localStorage.getItem("E-Comm")!=null){
          let x:string|null=localStorage.getItem("E-Comm")
        if(x!=null)
        dispatch(setAll({...JSON.parse(x)}))
      }
    }, [])

    //   update localstorage when redux state change
    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem("E-Comm", JSON.stringify(dataHub));
        }, 3)
    }, [dataHub])
  
  // console.log('state => ',state)

  return (
    <>
    <div className='d-flex '>
       <SideBar />
       <div className="mainBody py-3 px-4 " style={{backgroundColor:'aliceblue',width:'100%',height:'100vh',overflowY:'scroll'}}>
        <p className="fs-4 m-0 n-blue">{(location.pathname=='/')?'Dashboard':location.pathname.replaceAll('_',' ').slice(1)}</p>
        <p className="fs-6" style={{color: '#51678f'}}>Home {(location.pathname=='/')?'/ Dashboard':location.pathname.replace("/", " / ")}</p>
       <Routes>
       <Route path='/' element={<Dashboard/>} />
       <Route path='/Add_Product' element={<AddProduct   inputs = {dataHub.panelView.forms.product} state={state} objKey='products'  setState={setState}/>} />
       <Route path='/List_Products' element={<DataTables   table = {state.products} state={state} objKey='products' setState={setState}/>} />
       <Route path='/Place_Order' element={<AddProduct   inputs = {forms[1]} state={state} objKey='placeOrder' setState={setState}/>} />
       <Route path='/List_Order' element={<ListProducts   table = {state.placeOrder} state={state} objKey='placeOrder' setState={setState}/>} />
       <Route path='/Add_Setting' element={<AddProduct   inputs = {forms[2]} state={state} objKey='settings' setState={setState}/>} />
       <Route path='/List_Setting' element={<ListProducts   table = {state.settings} state={state} objKey='settings' setState={setState}/>} />
      </Routes>
      <Footer/>
       </div>
    
       </div>
   
    </>

  )
}

export default Body