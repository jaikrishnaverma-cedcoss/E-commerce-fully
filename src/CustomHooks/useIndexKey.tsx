import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { dataHubType } from '../Types/types';

const useIndexKey = () => {
    const getIndex=(dataHub:any,key:any,val:any)=>{
        let index=-1
        dataHub&&dataHub.forEach((x:any, i:number) => {
                if ( x[key] == val) {
                  index=i
                }
              });
            return index
    }
  return getIndex
}
export default useIndexKey