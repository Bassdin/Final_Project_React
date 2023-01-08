import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";

const CardInfoPage = () => {
  const { id } = useParams();
  console.log("id", id);
  useEffect(() => {
    axios
      .get(`/cards/card/${id}`)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [id]);
  return <h1>CardInfoPage</h1>;
};

export default CardInfoPage;
