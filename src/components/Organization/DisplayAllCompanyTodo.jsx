// async function GetAllIndivualTodos() {
//     const AllTodosWithGlobalType = await axios.get(
//       "http://localhost:3001/Indiviual/ParticulatIndiviualTodos",
//       { headers: { username: localStorage.getItem("Username") } }
//     );

import axios from "axios";
import { useState } from "react";

//     SetIndiviualTodos(AllTodosWithGlobalType.data.allTodosWithIndiviualType);
//   }

export function DisplayAllCompanyTodo() {
  const [CompanyTodos, SetCompanyTodos] = useState([]);

  useState(() => {
    GetAllTodos();
  }, []);
  async function GetAllTodos() {
    const AllTodos = await axios.get("http://localhost:3001/Company/AllTodos", {
      headers: { Companyname: localStorage.getItem("Companyname") },
    });

    SetCompanyTodos(AllTodos.data.allTodosByCompany);
  }
  return (
    <div>
      {CompanyTodos.map((EachElemet) => {
        return (
          <div key={EachElemet._id}>
            <DisplayTodos
              title={EachElemet.title}
              description={EachElemet.description}
              isCompleted={EachElemet.isCompleted}
            ></DisplayTodos>{" "}
          </div>
        );
      })}
    </div>
  );
}

function DisplayTodos(props) {
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
