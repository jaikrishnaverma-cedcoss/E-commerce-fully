import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./database";

const MySlice = createSlice({
  name: "mySlice",
  initialState,
  reducers: {
    setAll: (state, action) => {
      state = { ...action.payload };
    },
    // action.payload {key:'objName' , data:{}}
    pushData: (state: any, action) => {
      state[action.payload.key].push({ ...action.payload.data });
    },
    // lets deleteFunc action.payload {key:'objName' , index:1}
    deleteFunc: (state: any, action) => {
      state[action.payload.key].splice(action.payload.index, 1);
    },
    // login & LogOut Status Upadte
    setSession:(state:any,action)=>{
      state.session=action.payload
    },
    //for  signup 
    addUser:(state,action)=>{
      state.users.push({...action.payload})
    },
    addProductInCart:(state:any,action)=>{
      state.users[action.payload.userIndex].cart.push(action.payload.obj)
    },
    updateProductInCart:(state:any,action)=>{
      state.users[action.payload.userIndex].cart[action.payload.cartIndex].Quantity=action.payload.Quantity;
    }
  },
});

export default MySlice.reducer;
export const {updateProductInCart, addProductInCart, setAll, pushData, deleteFunc, setSession, addUser} = MySlice.actions;
