import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { LeftSideNavBar } from "./NavigationBar/LeftSideNavBar";
import { Main } from "./Hero/Main";
import tickiamge from "./Images/wrong.png";
import done from "./Images/tick.png";
import NotDone from "./Images/CircleWithoutHover.png";
import { PushSpinner, WhisperSpinner } from "react-spinners-kit";

export function HomePage() {
  const [globaltodos, setGlobalTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonPressed, SetButtonPressed] = useState(0);
  const [counter, setCounter] = useState(0);
  async function GetAllTodos() {
    const AllTodosWithGlobalType = await axios.get(
      "http://localhost:3001/GlobalTodos/AllTodos"
    );

    setGlobalTodos(AllTodosWithGlobalType.data.allTodosWithGlobalType);
  }

  useEffect(function () {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(function () {
    GetAllTodos();
  }, []);

  useEffect(
    function () {
      GetAllTodos();
    },

    [counter]
  );

  useEffect(
    function () {
      GetAllTodos();
    },

    [counter]
  );

  return (
    <div>
      {loading && (
        <div className="flex justify-center mt-80">
          <WhisperSpinner></WhisperSpinner>
        </div>
      )}
      {!loading && (
        <div className="grid grid-cols-[14rem,8fr]">
          <div>
            <div id="LeftSideDiv w-48">
              <LeftSideNavBar></LeftSideNavBar>
              <nav className="p m-5 w-11"></nav>
            </div>
          </div>
          <div>
            <div id="RightSideDiv ">
              <div className="flex-col justify-center md:ml-40 ml-24- ">
                <Main></Main>

                <div className="flex flex-row">
                  <div id="One">
                    <div className="mt-8  flex flex-row ">
                      <img src={tickiamge} height={6} width={26}></img>
                      <div className="text-sm font-medium mt-1">Over Due</div>
                    </div>
                    {globaltodos.map((EachElemet) => {
                      var isCompleted = EachElemet.isCompleted;
                      if (!isCompleted) {
                        return (
                          <div key={EachElemet._id} className="mt-4">
                            <DisplayGlobalTodos
                              id={EachElemet._id}
                              title={EachElemet.title}
                              description={EachElemet.description}
                              isCompleted={EachElemet.isCompleted}
                              owner={EachElemet.type}
                              time={EachElemet.createdAt}
                            ></DisplayGlobalTodos>{" "}
                          </div>
                        );
                      } else {
                        return;
                      }
                    })}
                  </div>
                  <div id="Two" className="md:ml-80 ml-40">
                    <div className="mt-8  flex flex-row ">
                      <img src={done} height={6} width={26}></img>
                      <div className="text-sm font-medium mt-1">Completed</div>
                    </div>
                    {globaltodos.map((EachElemet) => {
                      var isCompleted = EachElemet.isCompleted;
                      const time = EachElemet.createdAt;

                      if (isCompleted) {
                        return (
                          <div key={EachElemet._id} className="mt-4">
                            <DisplayGlobalTodosDone
                              id={EachElemet._id}
                              title={EachElemet.title}
                              description={EachElemet.description}
                              isCompleted={EachElemet.isCompleted}
                              owner={EachElemet.type}
                              time={EachElemet.createdAt}
                            ></DisplayGlobalTodosDone>{" "}
                          </div>
                        );
                      } else {
                        return;
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DisplayGlobalTodos(props) {
  const isCompleted = props.isCompleted;
  const id = props.id;
  const mutation = useMutation((updatedPost) =>
    axios.put("http://localhost:3001/IndiviualTodos/Completed", updatedPost)
  );

  function UpdateTodo() {
    mutation.mutate({ id });
    window.location.reload();
  }
  return (
    <div className="flex">
      <div>
        <div className="flex">
          <button onClick={UpdateTodo}>
            <img src={isCompleted ? done : NotDone} height={4} width={16}></img>
          </button>
          <h1 className="text-sm ml-6">{props.title}</h1>
        </div>

        <h3 className="text-xs ml-10">{props.description}</h3>
      </div>
    </div>
  );
}

function DisplayGlobalTodosDone(props) {
  const isCompleted = props.isCompleted;
  const id = props.id;

  const mutation = useMutation((updatedPost) =>
    axios.put("http://localhost:3001/Indiviualtodos/NotCompleted", updatedPost)
  );

  function UpdateTodo() {
    mutation.mutate({ id });
    window.location.reload();
  }
  return (
    <div className="flex mb-4">
      <div>
        <div className="flex">
          <button onClick={UpdateTodo}>
            <img
              src={!isCompleted ? NotDone : done}
              height={4}
              width={16}
            ></img>
          </button>
          <h1 className="text-sm ml-6">{props.title}</h1>
        </div>

        <h3 className="text-xs ml-10">{props.description}</h3>
      </div>
    </div>
  );
}
