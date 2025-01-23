import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { AddTodo } from "./Organization/AddTodo";
import { DisplayAllCompanyTodo } from "./Organization/DisplayAllCompanyTodo";
import { LeftSideNavBar } from "./NavigationBar/LeftSideNavBar";
import Popup from "reactjs-popup";
const BACKENDSERVER = import.meta.env.VITE_BACKEND_SERVER;
import x from "./Images/newtick.png";

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
    <div className="md:flex gap-8 font-Notion text-white bg-Robin4 ">
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
            <div className="mt-4 ">
              {" "}
              <a
                className="text-gray-400  hover:text-gray-300"
                href="https://github.com/RobinSuthar"
              >
                Robin Suthar
              </a>{" "}
            </div>
            <div className="ml-12 text-left">
              <div className=" mt-12 flex  text-left mb-4 ">
                <h1 className="text-7xl font-bold font-Notion ">
                  {localStorage.getItem("Companyname")}
                </h1>
              </div>
            </div>
            {!localStorage.getItem("Companyname") ? (
              <></>
            ) : (
              <div className="ml-12 mt-12">
                <div className="mr-12">
                  <div>
                    Welcome to the Company Section of your to-do website! Once
                    logged in with your company username and PIN, you’ll have
                    access to a personalized dashboard of tasks. Each task
                    displays key details, including the author who created it, a
                    descriptive title, and a brief explanation to understand its
                    purpose. Tasks are also assigned an importance level ranging
                    from 1 (low) to 5 (critical) to help you prioritize
                    effectively. Additionally, the tag indicates the person
                    responsible for completing the task.
                  </div>
                </div>
                <Popup
                  trigger={
                    <div className="flex mt-2  p-2 bg-blue-600 h-9 w-32 text-gray-300 rounded-lg ">
                      <div className="font-Notion text-sm  font-bold ml-2 ">
                        Add Todo
                      </div>
                      <div className="flex flex-col">
                        <div className="border-2 border-gray-400 h-6 ml-2"></div>
                      </div>
                      <div className="">
                        <img className="h-5 w-6  ml-1" src={x} alt="" />{" "}
                      </div>
                    </div>
                  }
                  position="md:left center right center"
                >
                  <AddTodo></AddTodo>
                </Popup>
                <div className="border-b-2 border-gray-700 mt-3 mr-20"></div>
              </div>
            )}

            <DisplayAllCompanyTodo></DisplayAllCompanyTodo>
          </div>
        </div>
      </div>
    </div>
  );
}
