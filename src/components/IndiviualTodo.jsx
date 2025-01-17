import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import Popup from "reactjs-popup";
import x from "./Images/icons8-add-48.png";
import { LeftSideNavBar } from "./NavigationBar/LeftSideNavBar";
import done from "./Images/tick.png";
import NotDone from "./Images/circleWithoutHover.png";
import z from "./Images/checked.png";
import cross from "./Images/wrong.png";
const BACKENDSERVER = import.meta.env.VITE_BACKEND_SERVER;

export function IndiviualTodo() {
  const [username, setUsername] = useState("");
  const [indiviualTodos, SetIndiviualTodos] = useState([]);

  const mutauion = useMutation((newUser) =>
    axios.post(`${BACKENDSERVER}/users/CreateUser`, newUser)
  );

  async function GetAllIndivualTodos() {
    const AllTodosWithGlobalType = await axios.get(
      `${BACKENDSERVER}/Indiviual/ParticulatIndiviualTodos`,
      { headers: { username: localStorage.getItem("Username") } }
    );

    SetIndiviualTodos(AllTodosWithGlobalType.data.allTodosWithIndiviualType);
  }

  useEffect(() => {
    GetAllIndivualTodos();
  }, []);

  function SubmitData() {
    mutauion.mutate({ username });
    localStorage.setItem("Username", username);
  }

  return (
    <div className="flex flex-col md:flex-row font-Robin">
      <div className="md:w-48 md:grid md:grid-cols-[14rem,8fr]">
        <LeftSideNavBar></LeftSideNavBar>
      </div>
      <div className=" md:ml-16 ml-0">
        {!localStorage.getItem("Username") ? (
          <div className="mt-10 md:mt-52">
            <h1 className="md:text-2xl text-xl">
              Please Enter Your Name to Proceed
            </h1>

            <input
              className="w-full  mt-4 pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow "
              placeholder="Type Here..."
              type="text"
              id="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
          </div>
        ) : (
          ""
        )}

        <button onClick={SubmitData}>
          {" "}
          {!localStorage.getItem("Username") ? (
            <div className="flex gap-2 mt-2">
              <h1 className="text-2xl">Submit</h1>
              <img height={4} width={36} src={z}></img>
            </div>
          ) : (
            ""
          )}
        </button>
        {!localStorage.getItem("Username") ? (
          <></>
        ) : (
          <div className="md:ml-56 flex justify-center">
            <Popup
              trigger={
                <div className="md:mt-16 mt-4 flex ">
                  <div>
                    <button className="">
                      <img height={24} width={36} src={x} alt="" />{" "}
                    </button>
                  </div>
                  <div className="text-xl font md:mr-28   font-semibold text-green-400 ml-2 mt-1">
                    Add Personal Todo
                  </div>
                </div>
              }
              position="down center"
            >
              <AddIndiviualTodo></AddIndiviualTodo>
            </Popup>
          </div>
        )}

        <div className="flex flex-row gap-4 md:gap-16">
          <div>
            {!localStorage.getItem("Username") ? (
              ""
            ) : (
              <div className="mt-8 md:ml-24  ml-8  flex flex-row ">
                <img src={cross} height={6} width={30}></img>
                <div className="text-lg  font-Bungee  mt-1">Over Due</div>
              </div>
            )}
            {indiviualTodos.map((EachElemet) => {
              var isCompleted = EachElemet.isCompleted;
              if (!isCompleted) {
                return (
                  <div key={EachElemet._id}>
                    <DisplayIndiviualTodos
                      title={EachElemet.title}
                      description={EachElemet.description}
                      isCompleted={EachElemet.isCompleted}
                      id={EachElemet._id}
                    ></DisplayIndiviualTodos>{" "}
                  </div>
                );
              } else {
                return;
              }
            })}
          </div>
          <div className="flex flex-col"></div>
          <div>
            {!localStorage.getItem("Username") ? (
              ""
            ) : (
              <div className="mt-8 md:ml-24   flex flex-row ">
                <img src={done} height={6} width={30}></img>
                <div className="text-lg  font-Bungee  mt-1">Completed</div>
              </div>
            )}
            {indiviualTodos.map((EachElemet) => {
              var isCompleted = EachElemet.isCompleted;
              if (isCompleted) {
                return (
                  <div key={EachElemet._id}>
                    <DisplayIndiviualTodosDone
                      title={EachElemet.title}
                      description={EachElemet.description}
                      isCompleted={EachElemet.isCompleted}
                      id={EachElemet._id}
                    ></DisplayIndiviualTodosDone>{" "}
                  </div>
                );
              } else {
                return;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function AddIndiviualTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const muation1 = useMutation((newTodod) => {
    axios.post(`${BACKENDSERVER}/Indiviual/CreateTodo`, newTodod);
  });

  function submitData() {
    muation1.mutate({
      username: localStorage.getItem("Username"),
      title: title,
      description: description,
    });
    document.querySelector("#Title").value = "";
    document.querySelector("#Description").value = "";
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  return (
    <div className=" font-Robin">
      {" "}
      <input
        className="p-1"
        placeholder="Enter Titke "
        type="text"
        id="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>{" "}
      <input
        className="p-1"
        placeholder="ENter description "
        type="text"
        id="Description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <button
        className="font-Robin text-xl hover:border-2 hover:border-green-400 p-1 rounded-2xl text-green-400"
        onClick={submitData}
      >
        {" "}
        Submit
      </button>
    </div>
  );
}

function DisplayIndiviualTodos(props) {
  const isCompleted = props.isCompleted;
  const id = props.id;

  const mutation = useMutation((updatedPost) =>
    axios.put(`${BACKENDSERVER}/IndiviualTodos/Completed`, updatedPost)
  );

  function UpdateTodo() {
    mutation.mutate({ id });
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  return (
    <div className=" flex flex-col  ml-8 md:ml-28 border-2 p-3 m-6 rounded-xl border-red-600  hover:border-red-300">
      <div className="">
        <div className="flex mt-1">
          <button onClick={UpdateTodo}>
            <img src={isCompleted ? done : NotDone} height={8} width={16}></img>
          </button>
          <h1 className=" text-xl   font-bold  ml-6 mr-4">{props.title}</h1>
        </div>

        <h3 className="text-xs  font-extralight ml-10">{props.description}</h3>
      </div>
    </div>
  );
}

function DisplayIndiviualTodosDone(props) {
  const isCompleted = props.isCompleted;
  const id = props.id;

  const mutation = useMutation((updatedPost) =>
    axios.put(`${BACKENDSERVER}/Indiviualtodos/NotCompleted`, updatedPost)
  );

  function UpdateTodo() {
    mutation.mutate({ id });
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  return (
    <div className=" flex flex-col md:ml-28 border-2  m-6 p-3 rounded-xl border-green-600  hover:border-green-300">
      <div>
        <div className="flex mt-1">
          <button onClick={UpdateTodo}>
            <img src={isCompleted ? done : NotDone} height={8} width={16}></img>
          </button>
          <h1 className="text-xl   font-bold  ml-6 ">{props.title}</h1>
        </div>

        <h3 className="text-xs  font-extralight ml-10">{props.description}</h3>
      </div>
    </div>
  );
}
