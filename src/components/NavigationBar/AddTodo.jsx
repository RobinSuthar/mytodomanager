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
          <button>
            <img height={16} width={20} src={x} alt="" />{" "}
          </button>
        }
        position="right center"
      >
        <AddTodos counter={counter} setCounter={setCounter}></AddTodos>
      </Popup>
      <div className="text-xs font-semibold text-green-400 ml-2 mt-1">
        Add Todo
      </div>
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
