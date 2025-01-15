import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import Popup from "reactjs-popup";
import x from "./Images/icons8-add-48.png";
import { LeftSideNavBar } from "./NavigationBar/LeftSideNavBar";
import done from "./Images/tick.png";
import NotDone from "./Images/CircleWithoutHover.png";

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
      <div className="md:ml-52">
        {!localStorage.getItem("Username") ? (
          <div className="w-56 mt-52">
            <h1>Please Enter Your Name to Proceed</h1>
            <input
              className=""
              placeholder="Enter Your username "
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
          {!localStorage.getItem("Username") ? " Submit" : ""}
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

        <div className="flex flex-row gap-24">
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
          {indiviualTodos.map((EachElemet) => {
            var isCompleted = EachElemet.isCompleted;
            if (isCompleted) {
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
  return (
    <div className=" flex flex-col ml-28">
      <div>
        <div className="flex mt-6">
          <button>
            <img src={isCompleted ? done : NotDone} height={8} width={16}></img>
          </button>
          <h1 className="text-sm ml-6">{props.title}</h1>
        </div>

        <h3 className="text-xs ml-10">{props.description}</h3>
      </div>
    </div>
  );
}
