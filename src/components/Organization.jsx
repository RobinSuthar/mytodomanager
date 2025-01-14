import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { AddTodo } from "./Organization/AddTodo";
import { DisplayAllCompanyTodo } from "./Organization/DisplayAllCompanyTodo";
export function Organization() {
  ///All Logic to Add A company is here
  const [companyName, setCompanyName] = useState("");
  const [companyPin, setCompanyPin] = useState("");

  const mutation = useMutation((newTodo) =>
    axios.post("http://localhost:3001/Organzations/CreateOrganztion", newTodo)
  );
  function HandleCompanyinfo() {
    //Logic To Upload info into Databse
    localStorage.setItem("Companyname", companyName);
    localStorage.setItem("Companypin", companyPin);
    mutation.mutate({ companyName, companyPin });
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Enter the Name Of you Company"
        onChange={(e) => {
          setCompanyName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Set up Pin"
        onChange={(e) => {
          setCompanyPin(e.target.value);
        }}
      />
      <button onClick={HandleCompanyinfo}>Submit Company infoamtion </button>
      <div>
        <h1 className="text-3xl mt-7">Adding Todo</h1>
        <AddTodo></AddTodo>
        <DisplayAllCompanyTodo></DisplayAllCompanyTodo>
      </div>
    </div>
  );
}
