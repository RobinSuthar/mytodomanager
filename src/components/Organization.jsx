import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { AddTodo } from "./Organization/AddTodo";
import { DisplayAllCompanyTodo } from "./Organization/DisplayAllCompanyTodo";
import { LeftSideNavBar } from "./NavigationBar/LeftSideNavBar";
import Popup from "reactjs-popup";
const BACKENDSERVER = import.meta.env.VITE_BACKEND_SERVER;
import x from "./Images/icons8-add-48.png";

export function Organization() {
  ///All Logic to Add A company is here
  const [companyName, setCompanyName] = useState("");
  const [companyPin, setCompanyPin] = useState("");

  const mutation = useMutation((newTodo) =>
    axios.post(`${BACKENDSERVER}/Organzations/CreateOrganztion`, newTodo)
  );
  function HandleCompanyinfo() {
    //Logic To Upload info into Databse
    localStorage.setItem("Companyname", companyName);
    localStorage.setItem("Companypin", companyPin);
    mutation.mutate({ companyName, companyPin });
  }
  return (
    <div className="md:flex gap-28 font-Notion text-white bg-Robin4 ">
      <div className=" ">
        <LeftSideNavBar></LeftSideNavBar>
      </div>

      <div>
        {!localStorage.getItem("Companypin") ? (
          <div className="md:mt-36 md:ml-28 mt-8 ">
            <div className="flex flex-col justify-center">
              <input
                className="md:w-80 w-60 font-Robin mt-4 pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border-4 border-green-200 rounded-md transition duration-300 ease focus:outline-none focus:border-green-400 hover:border-slate-300 shadow-sm focus:shadow "
                type="text"
                placeholder="Enter the Name Of you Company"
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
              />
              <input
                className="md:w-80  w-60 font-Robin  mt-4 pl-3 md:pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border-4 border-green-200 rounded-md transition duration-300 ease focus:outline-none focus:border-green-400 hover:border-slate-300 shadow-sm focus:shadow "
                type="text"
                placeholder="Set up Pin"
                onChange={(e) => {
                  setCompanyPin(e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <button
                className="font-Notion text-xl hover:border-2 hover:border-green-400 p-1 rounded-2xl text-green-400"
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
          <div>
            <div className="">
              <div className=" mt-5 flex justify-center text-center md:ml-56">
                <h1 className="text-4xl font-Notion ">
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
                    <div className="mt-7 flex justify-center md:ml-48">
                      <div>
                        <button className="">
                          <img height={24} width={26} src={x} alt="" />{" "}
                        </button>
                      </div>

                      <div className="text-sm    font-semibold text-green-400  mt-1">
                        Add Organizational Todo
                      </div>
                    </div>
                  }
                  position="md:left center right center"
                >
                  <AddTodo></AddTodo>
                </Popup>
              </div>
            )}

            <DisplayAllCompanyTodo></DisplayAllCompanyTodo>
          </div>
        </div>
      </div>
    </div>
  );
}
