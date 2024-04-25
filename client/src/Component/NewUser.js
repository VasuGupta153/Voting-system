import React from "react";
import Header from "./Header"
import UserForm from "./UserForm";
import Footer from "../Component/Footer";

function NewUser({ title, status, results }) {
  return (
    <div>
      <Header/>
      <UserForm/>
      <br />
      <br />
      <Footer/>
    </div>
  );
}

export default NewUser;
