import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { AddTodo } from "./Organization/AddTodo";
import { DisplayAllCompanyTodo } from "./Organization/DisplayAllCompanyTodo";
import { LeftSideNavBar } from "./NavigationBar/LeftSideNavBar";
import Popup from "reactjs-popup";

import x from "./Images/icons8-add-48.png";

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
    <div className="flex ">
      <div className="grid grid-cols-[14rem,8fr]">
        <LeftSideNavBar></LeftSideNavBar>
      </div>
      <div>
        {!localStorage.getItem("Companypin") ? (
          <div>
            <div className="flex flex-col">
              <input
                className="w-80  mt-4 pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow "
                type="text"
                placeholder="Enter the Name Of you Company"
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
              />
              <input
                className="w-80   mt-4 pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow "
                type="text"
                placeholder="Set up Pin"
                onChange={(e) => {
                  setCompanyPin(e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <button onClick={HandleCompanyinfo}>Submit </button>
            </div>
          </div>
        ) : (
          ""
        )}
        <div>
          {!localStorage.getItem("Companyname") ? (
            <></>
          ) : (
            <div>
              <Popup
                trigger={
                  <div className="mt-16 flex ">
                    <div>
                      <button className="">
                        <img height={24} width={36} src={x} alt="" />{" "}
                      </button>
                    </div>
                    <div className="text-xl font-semibold text-green-400 ml-2 mt-1">
                      Add Personal Todo
                    </div>
                  </div>
                }
                position="left center"
              >
                <AddTodo></AddTodo>
              </Popup>
            </div>
          )}

          <DisplayAllCompanyTodo></DisplayAllCompanyTodo>
        </div>
      </div>
    </div>
  );
}
