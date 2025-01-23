import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
const BACKENDSERVER = import.meta.env.VITE_BACKEND_SERVER;

export function AddTodo() {
  const mutation = useMutation((newTodo) => {
    axios.post(`${BACKENDSERVER}/Company/Todos`, newTodo);
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
    setTimeout(() => {
      window.location.reload();
    }, 500);
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
        className="flex p-2 bg-blue-600 h-9 w-30 text-gray-300 rounded-lg "
        onClick={handleClick}
      >
        <div className="font-Notion text-sm  font-bold hover:text-white ">
          Add Todo
        </div>
      </button>
    </div>
  );
}
