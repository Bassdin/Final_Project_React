import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi-browser";
import signupSchema from "../validation/signup.validation";
import { toast } from "react-toastify";
import "./SignupPage.css";


const SignupPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [biz, setBiz] = useState(false);

  const handleNameChange = (ev) => {
    setName(ev.target.value);
  };
  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };
  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };
  const handleBizChange = (ev) => {
    // console.log(ev.target.checked);
    setBiz(ev.target.checked);
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
      .post("/users/register", { name, email, password } )
      .then((res) => {
        console.log("res.data", res.data);
        navigate("/login", { state: { email, password } });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }};
  

  return (
    <div className="signupBox">
      <div className="content">
      <h1 className="header">Sign up Page</h1> <br />
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
        Submit
      </button>
    </form>
    </div>
  </div>
  );
};

export default SignupPage;
