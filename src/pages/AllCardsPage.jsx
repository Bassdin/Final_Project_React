import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CardComponent from "../components/CardComponent/CardComponent";
import "./AllCardsPage.css";
import React from "react";


const AllCardsPage = () => {
  const location = useLocation();
  const userInfoRedux = useSelector((state) => state.auth.userData);
  const [cardsArr, setCardsArr] = useState([]);
  console.log("location.pathname", location.pathname); 

  const onToggleFavoriteCard= (cardId) => {
    axios
    .patch("/users/favorite",{
      cardId
    })
    .then(({ data }) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }; 
  
  const onDeleteCard= (cardId) => {
    axios
    .delete("/cards/" + cardId)
    .then(({ data }) => {
      console.log("cards",data);
      setCardsArr(cardsArr.filter(card => card._id != cardId)); 
    })
    .catch((err) => {
      console.log(err);
    });
  }; 

  const onSearchCard= (e) => {
    if(e.key != "Enter" ) return;
    axios
    //.get("/cards/search?input="+ e.target.value)
    .get('/cards/search', {
      params: {
       input: e.target.value
      }
    })
    .then(({ data }) => {
      console.log("cards",data);
      setCardsArr(data); 
    })
    .catch((err) => {
      console.log(err);
    });
  }; 

  useEffect(() => {
    axios
      .get("/cards/all")
      .then(({ data }) => {
        console.log("cards",data);
        setCardsArr(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
  return (
    <div className="bgc">
      <input type="search" className="cards" onKeyDown={onSearchCard} tabIndex="0"/>
      <div className="content">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {cardsArr.map((item) => {
            return (
              <CardComponent
                id={item._id}
                key={item._id}
                name={item.bizName}
                description={item.bizDescription}
                phone={item.bizPhone}
                address={item.bizAddress}
                image={item.bizImage}
                userIDCard={item.user_id}
                userIDLoggedIn={userInfoRedux._id}
                onDeleteCard={onDeleteCard}
                onToggleFavoriteCard={onToggleFavoriteCard}
              />
            );
          })} 
    </div>
  </div>
</div>
  );
};

export default AllCardsPage;
