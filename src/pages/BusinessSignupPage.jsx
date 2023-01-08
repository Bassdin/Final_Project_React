import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Joi from "joi-browser";
import signupSchema from "../validation/signup.validation";
import { toast } from "react-toastify";
import { authActions } from "../store/auth";
import jwt_decode from "jwt-decode";
import "./BusinessSignupPage.css";

const BusinessSignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fromPage, setFromPage] = useState("");
  const biz = true;

  const handleNameChange = (ev) => {
    setName(ev.target.value);
  };
  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };
  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };

  const handleSignup = (ev) => {
    ev.preventDefault();

    const validatedValue = Joi.validate({ name, email, password }, signupSchema, {
      abortEarly: false,
    });
    const { error } = validatedValue;
    if (error) {
      //invalid email or password
      /* dispatch(authActions.logout()); */
      toast.error("Name and/or email and/or password invalidate");
    } else {
      //email and password is good
    //add joi validation
    axios
      .post("/users/register", { name, email, password, biz } )
      .then((res) => {
        console.log("res.data", res.data);
        axios.post("/auth/", {
          email,
          password,
        })
        .then((res) => {
          dispatch(authActions.login());
          const decoded = jwt_decode(res.data.token);
          dispatch(authActions.updateUser(decoded));
          localStorage.setItem("tokenKey", res.data.token);
          navigate("/CreateCard");

        })
      })
      .catch((err) => {
        console.log("err", err);
      });
  }};
  

  return (
    <div className="box">
      <div className="content">
      <h1 className="header">Business Sign Up Page</h1> <br />
    <form onSubmit={handleSignup}>
      <div className="mb-3">
        <label htmlFor="exampleInputName1" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputName1"
          onChange={handleNameChange}
          value={name}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={handleEmailChange}
          value={email}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={handlePasswordChange}
          value={password}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Next
      </button>
    </form>
    </div>
    </div>
  );
};

export default BusinessSignupPage;
