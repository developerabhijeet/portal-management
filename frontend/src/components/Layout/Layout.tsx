import React, { Children, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Layout = ({ Children }) => {
    const[showHeader,setShowHeader] =useState(false);
  const location = useLocation();
//   useEffect(() => {
//     if(location.pathname==="/"){
//         setShowHeader(false)
//     }
//     else(
//         setShowHeader(true)
//     )
//     console.log(location);
//   }, [location]);



  return <div>{Children}</div>;
};
