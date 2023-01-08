import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AuthGuardRoute from "./components/AuthGuardRoute";
import NavBarComponent from "./components/NavBarComponent/NavBarComponent";
// import CardInfoPage from "./pages/CardInfoPage";
import CardsPanelPage from "./pages/MyCardsPanelPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import QueryParams from "./pages/QueryParams";
import AboutPage from "./pages/AboutPage";
import BusinessSignupPage from "./pages/BusinessSignupPage";
import CreateCardPage from "./pages/CreateCardPage";
import CreateCard from "./pages/CreateCardPage";
import EditCard from "./pages/EditCardPage";
import AllCardsPage from"./pages/AllCardsPage";
// import SignupPage from "./pages/SignupPage";

import useRandomNumber from "./hooks/useRandomNumber";

const SignupPage = React.lazy(() => import("./pages/SignupPage"));

function App() {
  return (
    <div className="container">
      <NavBarComponent></NavBarComponent>
      <ToastContainer />
      <Suspense fallback={<div>loading</div>}>
        <Routes>
          {/* http://localhost:3000/ */}
          <Route path="/" element={<Navigate to="/home" />} />
          {/* http://localhost:3000/home */}
          <Route path="/home" element={<HomePage />} />
          {/* http://localhost:3000/about */}
          <Route path="/about" element={<AboutPage />} />
          {/* http://localhost:3000/login */}
          <Route path="/login" element={<LoginPage />} />
          {/* http://localhost:3000/signup */}
          <Route path="/signup" element={<SignupPage />} />
          {/* http://localhost:3000/BusinessSignupPage*/}
          <Route path="/BusinessSignupPage" element={<BusinessSignupPage />} />
           {/* http://localhost:3000/CreateCardPage*/}
           <Route path="/CreateCardPage" element={<CreateCardPage />} />
          {/* http://localhost:3000/cardspanel */}
          <Route path="/Mycardspanel" element={<CardsPanelPage />} />
          <Route path="/CreateCard" element={<CreateCard />} />
          <Route path="/AllCardsPage" element={<AllCardsPage />} />
          <Route path="/EditCard/:id" element={<EditCard />} />
          <Route path="/qparams" element={<QueryParams />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

    </div>
  );
}

export default App;
