import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
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

  function CHeckingLocvalSotage() {
    const userName = localStorage.getItem("Username");
    console.log(userName);
  }
  return (
    <div>
      {console.log(username)}
      <input
        placeholder="Enter Your username "
        type="text"
        id="Username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      ></input>
      <button onClick={SubmitData}> Submit</button>
      <button onClick={CHeckingLocvalSotage}>Checking locakStorag</button>
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

    console.log("Added");
  }

  return (
    <div className="bg-slate-400">
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
  return (
    <div>
      <div className="gap-6 m-6 p-3  text-center border-4 border-black">
        <h1 className="text-4xl">{props.title}</h1>
        <h3 className="text-2xl">{props.description}</h3>

        <h3 className="text-2xl">{props.isCompleted}</h3>
      </div>
    </div>
  );
}
