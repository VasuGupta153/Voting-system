import React from "react";
import Header from "./Header"
import UserForm from "./UserForm";

function NewUser({ title, status, results }) {
  return (
    <div>
      <Header/>
      <UserForm/>
    </div>
  );
}

export default NewUser;
