import axios from "axios";
import { useState } from "react";
import done from "../Images/tick.png";
import NotDone from "../Images/CircleWithoutHover.png";
import tickiamge from "../Images/wrong.png";
import { useMutation } from "react-query";
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
      <div className="flex flex-row  ml-14  ">
        <div className="mt-8  flex flex-row">
          <div>
            <img src={tickiamge} height={1} width={26}></img>
          </div>
          <div className="text-sm font-medium mt-1">Over Due</div>
        </div>
        <div className="mt-8  flex flex-row ml-36">
          <div>
            <img src={done} height={1} width={26}></img>
          </div>
          <div className="text-sm font-medium mt-1">Completed</div>
        </div>
      </div>
      <div className="flex  gap-16">
        <div>
          {CompanyTodos.map((EachElemet) => {
            var isCompleted = EachElemet.isCompleted;
            if (!isCompleted) {
              return (
                <div key={EachElemet._id}>
                  <DisplayTodos
                    id={EachElemet._id}
                    author={EachElemet.author}
                    tag={EachElemet.tag}
                    importance={EachElemet.importance}
                    title={EachElemet.title}
                    description={EachElemet.description}
                    isCompleted={EachElemet.isCompleted}
                  ></DisplayTodos>{" "}
                </div>
              );
            } else {
              return;
            }
          })}
        </div>

        <div>
          {CompanyTodos.map((EachElemet) => {
            var isCompleted = EachElemet.isCompleted;
            if (isCompleted) {
              return (
                <div key={EachElemet._id}>
                  <DisplayTodosDone
                    id={EachElemet._id}
                    author={EachElemet.author}
                    tag={EachElemet.tag}
                    importance={EachElemet.importance}
                    title={EachElemet.title}
                    description={EachElemet.description}
                    isCompleted={EachElemet.isCompleted}
                  ></DisplayTodosDone>{" "}
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

function DisplayTodos(props) {
  const isCompleted = props.isCompleted;
  const id = props.id;
  const mutation = useMutation((updatedPost) =>
    axios.put("http://localhost:3001/Company/isCompleted", updatedPost)
  );

  function UpdateTodo() {
    mutation.mutate({ id });
    window.location.reload();
  }

  return (
    <div>
      <div className="gap-6 m-6 p-3  text-center ">
        <div className="flex mt-6">
          <button onClick={UpdateTodo}>
            <img src={isCompleted ? done : NotDone} height={8} width={16}></img>
          </button>
          <h1 className="text-sm ml-6">{props.title}</h1>
        </div>
        <h3 className="text-xs ml-10">{props.description}</h3>
        <h3 className="text-xs ml-10">
          Status :{props.isCompleted ? "Done" : "NoteDone"}
        </h3>
        <h3 className="text-xs ml-10">{props.author}</h3>
        <h3 className="text-xs ml-10">{props.importance}</h3>
        <h3 className="text-xs ml-10">{props.tag}</h3>
      </div>
    </div>
  );
}

function DisplayTodosDone(props) {
  const isCompleted = props.isCompleted;
  const id = props.id;

  const mutation = useMutation((updatedPost) =>
    axios.put("http://localhost:3001/Company/NotCompleted", updatedPost)
  );

  function UpdateTodo() {
    mutation.mutate({ id });
    window.location.reload();
  }

  return (
    <div>
      <div className="gap-6 m-6 p-3  text-center ">
        <div className="flex mt-6">
          <button onClick={UpdateTodo}>
            <img src={isCompleted ? done : NotDone} height={8} width={16}></img>
          </button>
          <h1 className="text-sm ml-6">{props.title}</h1>
        </div>
        <h3 className="text-xs ml-10">{props.description}</h3>
        <h3 className="text-xs ml-10">
          Status :{props.isCompleted ? "Done" : "NoteDone"}
        </h3>
        <h3 className="text-xs ml-10">{props.author}</h3>
        <h3 className="text-xs ml-10">{props.importance}</h3>
        <h3 className="text-xs ml-10">{props.tag}</h3>
      </div>
    </div>
  );
}
