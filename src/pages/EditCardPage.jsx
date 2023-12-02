import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import Joi from "joi-browser";
import CreateCardSchema from "../validation/CreateCard.validation";
import { toast } from "react-toastify";
import "./EditCardPage.css";
import React from "react";


const EditCard = () => {
  const navigate = useNavigate();

  const [bizName, setName] = useState("");
  const [bizDescription, setDescription] = useState("");
  const [bizAddress, setAddress] = useState("");
  const [bizPhone, setPhone] = useState("");
  const [bizImage, setImage] = useState("");
  const { id } = useParams();

  const handleNameChange = (ev) => {
    setName(ev.target.value);
  };
  const handleDescriptionChange = (ev) => {
    setDescription(ev.target.value);
  };
  const handleAddressChange = (ev) => {
    setAddress(ev.target.value);
  };
  const handlePhoneChange = (ev) => {
    setPhone(ev.target.value);
  };
  const handleImageChange = (ev) => {
    setImage(ev.target.value);
  };

  const handleEdit = (ev) => {
    ev.preventDefault();

    const validatedValue = Joi.validate({ bizName, bizDescription, bizAddress, bizPhone, bizImage }, CreateCardSchema, {
      abortEarly: false,
    });
    const { error } = validatedValue;
    if (error) {
      toast.error("Wrong biz card details");
    } else {
    //add joi validation
    axios
    .put(`/cards/${id}`,{ bizName, bizDescription, bizAddress, bizPhone, bizImage } )
    .then(({  }) => {
      toast("Card is Updated");
      navigate("/Mycardspanel");
       });
  }};

  useEffect(() => {
    axios
    .get(`/cards/${id}`)
    .then(({ data }) => {
      setName(data.bizName);
      setDescription(data.bizDescription);
      setAddress(data.bizAddress);
      setPhone(data.bizPhone);
      setImage(data.bizImage);
       })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="box">
      <div className="content">
      <h1 className="header">Edit Card Page</h1> <br />
    <form onSubmit={handleEdit}>
      <div className="mb-3">
        <label htmlFor="exampleInputName1" className="form-label">
          Business Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputName1"
          onChange={handleNameChange}
          value={bizName}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputDescription1" className="form-label">
        Business Description
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputDescription1"
          onChange={handleDescriptionChange}
          value={bizDescription}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputAddress1" className="form-label">
        Business Address
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputAddress1"
          onChange={handleAddressChange}
          value={bizAddress}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputAddress1" className="form-label">
        Business Phone
        </label>
        <input
          type="tel"
          className="form-control"
          id="exampleInputPhone"
          onChange={handlePhoneChange}
          value={bizPhone}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPhone1" className="form-label">
        Business Image
        </label>
        <input
          type="url"
          className="form-control"
          id="exampleInputImage"
          onChange={handleImageChange}
          value={bizImage}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
    </div>
    </div>
  );
};

export default EditCard;
