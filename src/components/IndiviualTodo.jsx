import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import Popup from "reactjs-popup";
import x from "./Images/icons8-add-48.png";
import { LeftSideNavBar } from "./NavigationBar/LeftSideNavBar";
import done from "./Images/tick.png";
import NotDone from "./Images/CircleWithoutHover.png";
import z from "./Images/checked.png";
export function IndiviualTodo() {
  const [username, setUsername] = useState("");
  const [indiviualTodos, SetIndiviualTodos] = useState([]);

  const mutauion = useMutation((newUser) =>
    axios.post("http://localhost:3001/users/CreateUser", newUser)
  );

  async function GetAllIndivualTodos() {
    const AllTodosWithGlobalType = await axios.get(
      "http://localhost:3001/Indiviual/ParticulatIndiviualTodos",
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
    <div className="flex">
      <div className="w-48 grid grid-cols-[14rem,8fr]">
        <LeftSideNavBar></LeftSideNavBar>
      </div>
      <div className="md:ml-36 ml-24">
        {!localStorage.getItem("Username") ? (
          <div className=" mt-52">
            <h1 className="text-2xl">Please Enter Your Name to Proceed</h1>
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
          <div className="ml-56">
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
              <AddIndiviualTodo></AddIndiviualTodo>
            </Popup>
          </div>
        )}

        <div className="flex flex-row gap-16">
          <div>
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
    axios.post("http://localhost:3001/Indiviual/CreateTodo", newTodod);
  });

  function submitData() {
    muation1.mutate({
      username: localStorage.getItem("Username"),
      title: title,
      description: description,
    });
    document.querySelector("#Title").value = "";
    document.querySelector("#Description").value = "";
    console.log("Added");
    window.location.reload();
  }

  return (
    <div className="">
      {" "}
      <input
        placeholder="Enter Titke "
        type="text"
        id="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>{" "}
      <input
        placeholder="ENter description "
        type="text"
        id="Description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <button onClick={submitData}> Submit</button>
    </div>
  );
}

function DisplayIndiviualTodos(props) {
  const isCompleted = props.isCompleted;
  const id = props.id;

  const mutation = useMutation((updatedPost) =>
    axios.put("http://localhost:3001/IndiviualTodos/Completed", updatedPost)
  );

  function UpdateTodo() {
    mutation.mutate({ id });
    window.location.reload();
  }

  return (
    <div className=" flex flex-col ml-28">
      <div>
        <div className="flex mt-6">
          <button onClick={UpdateTodo}>
            <img src={isCompleted ? done : NotDone} height={8} width={16}></img>
          </button>
          <h1 className="text-sm ml-6">{props.title}</h1>
        </div>

        <h3 className="text-xs ml-10">{props.description}</h3>
      </div>
    </div>
  );
}

function DisplayIndiviualTodosDone(props) {
  const isCompleted = props.isCompleted;
  const id = props.id;

  const mutation = useMutation((updatedPost) =>
    axios.put("http://localhost:3001/Indiviualtodos/NotCompleted", updatedPost)
  );

  function UpdateTodo() {
    mutation.mutate({ id });
    window.location.reload();
  }

  return (
    <div className=" flex flex-col ml-28">
      <div>
        <div className="flex mt-6">
          <button onClick={UpdateTodo}>
            <img src={isCompleted ? done : NotDone} height={8} width={16}></img>
          </button>
          <h1 className="text-sm ml-6">{props.title}</h1>
        </div>

        <h3 className="text-xs ml-10">{props.description}</h3>
      </div>
    </div>
  );
}
