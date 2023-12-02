import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CardComponent from "../components/CardComponent/CardComponent";
import "./MyCardsPanelPage.css";
import React from "react";


const MyCardsPanelPage = () => {
  const location = useLocation();
  const userInfoRedux = useSelector((state) => state.auth.userData);
  const [cardsArr, setCardsArr] = useState([]);
  console.log("location.pathname", location.pathname); 

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

  useEffect(() => {
    axios
      .get("/users/cards")
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
      <div className="content" Style={"width:100%"}>
        <div className="row row-cols-2 row-cols-md-3 g-4 w-90">
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
                starImage={item.starImage}
                userIDCard={item.user_id}
                userIDLoggedIn={userInfoRedux._id}
                onDeleteCard={onDeleteCard}
              />
            );
          })} 
    </div>
  </div>
</div>
  );
};

export default MyCardsPanelPage;
