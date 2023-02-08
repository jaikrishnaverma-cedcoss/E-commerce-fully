import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./database";

const MySlice = createSlice({
  name: "mySlice",
  initialState,
  reducers: {
    setAll:(state,action)=>{
    state={...action.payload}
    }
  },
});

export default MySlice.reducer
export const {setAll} =  MySlice.actions