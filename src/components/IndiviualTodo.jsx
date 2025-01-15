import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import Popup from "reactjs-popup";
import { Selection } from "./NavigationBar/Selection";
import { LeftSideNavBar } from "./NavigationBar/LeftSideNavBar";
import done from "./Images/tick.png";
import NotDone from "./Images/CircleWithoutHover.png";

export function IndiviualTodo() {
  const [username, setUsername] = useState("");
  const [indiviualTodos, SetIndiviualTodos] = useState([]);
  const [firstVisit, setFirstVisit] = useState(true);
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
  const MyPopup = () => (
    <Popup trigger={firstVisit} position="right center">
      <div>Popup content here!</div>
    </Popup>
  );

  useEffect(() => {
    MyPopup();
    setFirstVisit(false);
  }, []);

  useEffect(() => {
    GetAllIndivualTodos();
  }, []);

  function SubmitData() {
    mutauion.mutate({ username });
    localStorage.setItem("Username", username);
    setFirstVisit(false);
  }

  return (
    <div className="flex">
      <div className="w-48 grid grid-cols-[14rem,8fr]">
        <LeftSideNavBar></LeftSideNavBar>
      </div>
      <div>
        {firstVisit ? (
          <input
            placeholder="Enter Your username "
            type="text"
            id="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
        ) : (
          ""
        )}

        <button onClick={SubmitData}> {firstVisit ? " Submit" : ""}</button>
        <AddIndiviualTodo></AddIndiviualTodo>
        {indiviualTodos.map((EachElemet) => {
          return (
            <div key={EachElemet._id}>
              <DisplayIndiviualTodos
                title={EachElemet.title}
                description={EachElemet.description}
                isCompleted={EachElemet.isCompleted}
              ></DisplayIndiviualTodos>{" "}
            </div>
          );
        })}
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
    <div className="bg-slate-400 text-sm mt-3 ml-36">
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
  return (
    <div className="flex ml-28">
      <div>
        <div className="flex mt-6">
          <button>
            <img src={isCompleted ? NotDone : done} height={4} width={16}></img>
          </button>
          <h1 className="text-sm ml-6">{props.title}</h1>
        </div>

        <h3 className="text-xs ml-10">{props.description}</h3>
      </div>

      <div>
        <div className="ml-56">
          <div className="flex ">
            <h1 className="text-sm ">{props.owner}</h1>
          </div>

          <h3 className="text-xs ">{props.time}</h3>
        </div>
      </div>
    </div>
  );
}
