import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi-browser";
import CreateCardSchema from "../validation/CreateCard.validation";
import { toast } from "react-toastify";
import "./CreateCardPage.css";


const CreateCard = () => {
  const navigate = useNavigate();

  const [bizName, setName] = useState("");
  const [bizDescription, setDescription] = useState("");
  const [bizAddress, setAddress] = useState("");
  const [bizPhone, setPhone] = useState
  ("");
  const [bizImage, setImage] = useState("");

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

  const handleSignup = (ev) => {
    ev.preventDefault();

    const validatedValue = Joi.validate({ bizName, bizDescription, bizAddress, bizPhone, bizImage   }, CreateCardSchema, {
      abortEarly: false,
    });
    const { error } = validatedValue;
    if (error) {
      //invalid email or password
      /* dispatch(authActions.logout()); */
      toast.error("Name and/or Description and/or Address and/or Phone and/or Image is invalidate");
    } else {
      //email and password is good
    //add joi validation
    axios
      .post("/cards", { bizName, bizDescription, bizAddress, bizPhone, bizImage } )
      .then((res) => {
        console.log("res.data", res.data);
        navigate("/cardspanel");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }};
  

  return (
    <div className="box">
      <div className="content">
      <h1 className="header">Create Card Page</h1> <br />
    <form onSubmit={handleSignup}>
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

export default CreateCard;
