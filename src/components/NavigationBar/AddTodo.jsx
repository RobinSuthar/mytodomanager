import { useState } from "react";
import x from "../Images/dwnarroa.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useMutation } from "react-query";
import axios from "axios";
const BACKENDSERVER = import.meta.env.VITE_BACKEND_SERVER;

export function AddTodo() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="flex font-Notion  mt-1 ">
      <Popup
        trigger={
          <button className="flex p-2 bg-blue-600 h-9 w-30 text-gray-300 rounded-lg  ">
            <div className="font-Notion text-sm  font-bold ml-2 ">Add Todo</div>
            <div className="flex flex-col">
              <div className="border-2 border-gray-400 h-6 ml-2"></div>
            </div>
            <img className="h-6 w-6 " src={x} alt="" />{" "}
          </button>
        }
        position="right center"
      >
        <AddTodos counter={counter} setCounter={setCounter}></AddTodos>
      </Popup>
    </div>
  );
}

function AddTodos(props) {
  var counter = props.counter;
  const setCounter = props.setCounter;
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const mutation = useMutation((newTodo) =>
    axios.post(`${BACKENDSERVER}/GlobalTodos/CreateTodo`, newTodo)
  );

  function submitData() {
    mutation.mutate({ title, description });

    document.querySelector("#Title").value = "";
    document.querySelector("#Description").value = "";
    setCounter((counter = counter + 1));
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
  return (
    <div className="font-Notion ">
      <input
        className="p-1"
        id="Title"
        name="title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      ></input>
      <input
        className="p-1"
        id="Description"
        type="text"
        name="description"
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      ></input>
      <button
        className="font-Notion text-base text-gray-600 hover:bg-blue-500 hover:text-white mt-1  hover:rounded-lg p-1 rounded-2xl "
        onClick={submitData}
      >
        {" "}
        Add Todo
      </button>
    </div>
  );
}
