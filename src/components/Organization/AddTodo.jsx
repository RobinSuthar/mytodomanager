import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";

export function AddTodo() {
  const mutation = useMutation((newTodo) => {
    axios.post("http://localhost:3001/Company/Todos", newTodo);
  });

  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [importance, setImportance] = useState(0);
  const [tag, setTag] = useState("");

  function handleClick() {
    //Some Logic to add into Database
    const companyName = localStorage.getItem("Companyname");
    mutation.mutate({
      companyName,
      author,
      description,
      title,
      importance,
      tag,
    });

    document.querySelector("#Title").value = "";
    document.querySelector("#Description").value = "";
    document.querySelector("#Author").value = "";
    document.querySelector("#Tag").value = "";
    document.querySelector("#Importance").value = "";
    window.location.reload();
  }
  return (
    <div className="font-Robin">
      <input
        className="p-1"
        placeholder="Author Name"
        id="Author"
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
      ></input>

      <input
        className="p-1"
        placeholder="Enter the Title"
        id="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>

      <input
        className="p-1"
        placeholder="Enter Description"
        id="Description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>

      <input
        className="p-1"
        placeholder="Enter importance 1-5"
        id="Importance"
        type="number"
        onChange={(e) => {
          setImportance(e.target.value);
        }}
      ></input>

      <input
        className="p-1"
        placeholder="Tag Someone"
        id="Tag"
        onChange={(e) => {
          setTag(e.target.value);
        }}
      ></input>
      <button
        className="font-Robin text-xl hover:border-2 hover:border-green-400 p-1 rounded-2xl text-green-400"
        onClick={handleClick}
      >
        Submit
      </button>
    </div>
  );
}
