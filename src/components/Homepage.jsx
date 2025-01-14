import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { IndiviualTodo } from "./IndiviualTodo";
import { LeftSideNavBar } from "./NavigationBar/LeftSideNavBar";
import { Main } from "./Hero/Main";

export function HomePage() {
  const [globaltodos, setGlobalTodos] = useState([]);
  const [buttonPressed, SetButtonPressed] = useState(0);
  const [counter, setCounter] = useState(0);
  async function GetAllTodos() {
    const AllTodosWithGlobalType = await axios.get(
      "http://localhost:3001/GlobalTodos/AllTodos"
    );

    setGlobalTodos(AllTodosWithGlobalType.data.allTodosWithGlobalType);
  }

  useEffect(function () {
    console.log("INTIAL MOUNT OF USEEFFECT");
    GetAllTodos();
  }, []);

  useEffect(
    function () {
      console.log("USE EFFECT CALLED AGAIN BASED ON COUNTER");
      GetAllTodos();
    },

    [counter]
  );

  useEffect(
    function () {
      console.log("USE EFFEq");
      GetAllTodos();
    },

    [counter]
  );

  return (
    <div className="grid grid-cols-[14rem,8fr]">
      <div id="LeftSideDiv w-48">
        <LeftSideNavBar></LeftSideNavBar>
        <nav className="p m-5 w-11">
          <AddTodo counter={counter} setCounter={setCounter}></AddTodo>
        </nav>
      </div>

      <div id="RightSideDiv " className="grid grid-rows-3 grid-cols-3 gap-4">
        <div></div>
        <div>
          <Main></Main>
        </div>
        <div></div>
        {globaltodos.map((EachElemet) => {
          return (
            <div key={EachElemet._id}>
              <DisplayGlobalTodos
                title={EachElemet.title}
                description={EachElemet.description}
                isCompleted={EachElemet.isCompleted}
              ></DisplayGlobalTodos>{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DisplayGlobalTodos(props) {
  return (
    <div className="gap-6 m-6 p-3  text-center border-4 border-black">
      <h1 className="text-4xl">{props.title}</h1>
      <h3 className="text-2xl">{props.description}</h3>
      <h3 className="text-2xl">{props.isCompleted}</h3>
    </div>
  );
}

function AddTodo(props) {
  var counter = props.counter;
  const setCounter = props.setCounter;
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const mutation = useMutation((newTodo) =>
    axios.post("http://localhost:3001/GlobalTodos/CreateTodo", newTodo)
  );

  function submitData() {
    mutation.mutate({ title, description });
    document.querySelector("#Title").value = "";
    document.querySelector("#Description").value = "";
    setCounter((counter = counter + 1));
  }
  return (
    <div>
      <input
        id="Title"
        name="title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      ></input>
      <input
        id="Description"
        type="text"
        name="description"
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      ></input>
      <button onClick={submitData}> Add Todo</button>
    </div>
  );
}
