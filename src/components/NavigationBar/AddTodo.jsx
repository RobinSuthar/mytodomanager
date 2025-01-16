import { useState } from "react";
import x from "../Images/icons8-add-48.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useMutation } from "react-query";
import axios from "axios";

export function AddTodo() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="flex justify-center mt-7 mr-14">
      <Popup
        trigger={
          <button className="flex p-2  hover:border-2 hover:border-green-400 rounded-2xl text-green-400 ">
            <img height={16} width={30} src={x} alt="" />{" "}
            <div className="font-Robin  font-semibold ml-2 mt-1">Add Todo</div>
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
    axios.post("http://localhost:3001/GlobalTodos/CreateTodo", newTodo)
  );

  function submitData() {
    mutation.mutate({ title, description });

    document.querySelector("#Title").value = "";
    document.querySelector("#Description").value = "";
    setCounter((counter = counter + 1));
    window.location.reload();
  }
  return (
    <div className="font-Robin">
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
        className="font-Robin text-xl hover:border-2 hover:border-green-400 p-1 rounded-2xl text-green-400"
        onClick={submitData}
      >
        {" "}
        Add Todo
      </button>
    </div>
  );
}
