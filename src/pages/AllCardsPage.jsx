import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CardComponent from "../components/CardComponent/CardComponent";
import "./AllCardsPage.css";
import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
      <Row>
        <input type="search" className="search mb-5 mt-5" onKeyDown={onSearchCard} tabIndex="0" placeholder="Search..."/>
      </Row>
      <Row style={{width:"100%"}}>
        <div className="content" >
          <div className="row row-cols-md-3 ">
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
                  favorite={item.favorite}
                  userIDLoggedIn={userInfoRedux._id}
                  onDeleteCard={onDeleteCard}
                  onToggleFavoriteCard={onToggleFavoriteCard}
                />
              );
            })} 
          </div>
        </div>
      </Row>
    </div>
  );
};

export default AllCardsPage;
