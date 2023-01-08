import { useLocation } from "react-router-dom";
import React from "react";

const QueryParams = () => {
  const location = useLocation();
  const qParams = new URLSearchParams(location.search);
  console.log(qParams.get("key2"));
  console.log(qParams.get("key3"));
  return <h1>QParams</h1>;
};

export default QueryParams;
