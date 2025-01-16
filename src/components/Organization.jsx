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
    <div className="flex gap-28 ">
      <div className="grid grid-cols-[14rem,8fr]">
        <LeftSideNavBar></LeftSideNavBar>
      </div>

      <div>
        {!localStorage.getItem("Companypin") ? (
          <div className="mt-36 ml-28">
            <div className="flex flex-col justify-center">
              <input
                className="w-80    font-Robin mt-4 pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow "
                type="text"
                placeholder="Enter the Name Of you Company"
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
              />
              <input
                className="w-80 font-Robin  mt-4 pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow "
                type="text"
                placeholder="Set up Pin"
                onChange={(e) => {
                  setCompanyPin(e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <button
                className="font-Robin text-xl hover:border-2 hover:border-green-400 p-1 rounded-2xl text-green-400"
                onClick={HandleCompanyinfo}
              >
                Submit{" "}
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        <div>
          <div className="">
            <div className=" mt-5 ml-56">
              <h1 className="text-4xl">
                {localStorage.getItem("Companyname")}
              </h1>
            </div>
          </div>
          {!localStorage.getItem("Companyname") ? (
            <></>
          ) : (
            <div>
              <Popup
                trigger={
                  <div className="mt-7 flex  ml-48">
                    <div>
                      <button className="">
                        <img height={24} width={26} src={x} alt="" />{" "}
                      </button>
                    </div>
                    <div className="text-sm font-semibold text-green-400  mt-1">
                      Add Organizational Todo
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
