import React, { Component, useState } from "react";

export default function SimpleSlider({ arr }: { arr: string[] }) {
const [count,setCount]=useState(0)

  return (
     <div className="d-flex flex-column align-items-center" style={{ maxWidth: "80px", maxHeight: "100px",  }}>
          <img
            src={arr[count]}
            style={{ maxWidth: "80px", maxHeight: "80px", marginTop: "5px" }}
            onClick={()=>setCount(prev=>(prev>=arr.length-1?0:prev+1))}
            alt={count+arr[count]}
          />
          <h4 className="text-primary my-1"  onClick={()=>setCount(prev=>(prev>=arr.length-1?0:prev+1))}>{(count+1)+'/'+arr.length}</h4>
     </div>
  );
}
