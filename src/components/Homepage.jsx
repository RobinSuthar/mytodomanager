import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { LeftSideNavBar } from "./NavigationBar/LeftSideNavBar";
import { Main } from "./Hero/Main";
import tickiamge from "./Images/wrong.png";
import done from "./Images/tick.png";
import NotDone from "./Images/circleWithoutHover.png";
import { PushSpinner, WhisperSpinner } from "react-spinners-kit";
const BACKENDSERVER = import.meta.env.VITE_BACKEND_SERVER;

export function HomePage() {
  const [globaltodos, setGlobalTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonPressed, SetButtonPressed] = useState(0);
  const [counter, setCounter] = useState(0);
  async function GetAllTodos() {
    const AllTodosWithGlobalType = await axios.get(
      `${BACKENDSERVER}/GlobalTodos/AllTodos`
    );

    setGlobalTodos(AllTodosWithGlobalType.data.allTodosWithGlobalType);
  }

  useEffect(function () {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
    <div className="bg-Robin">
      {loading && (
        <div className="flex justify-center mt-80 md:mt-60">
          <WhisperSpinner></WhisperSpinner>
        </div>
      )}
      {!loading && (
        <div className="md:grid md:grid-cols-[14rem,8fr] text-white  ">
          <div className="bg-Robin2">
            <div id="LeftSideDiv w-48">
              <LeftSideNavBar></LeftSideNavBar>
              <nav className="p m-5 w-11"></nav>
            </div>
          </div>
          <div>
            <div id="RightSideDiv " className=" ">
              <div className="flex-col justify-center md:ml-26 ml-2 ">
                <Main></Main>

                <div className="flex flex-row md:gap-20 gap-12 md:ml-24">
                  <div id="One" className="">
                    <div className="mt-8  flex flex-row ">
                      <img src={tickiamge} height={6} width={30}></img>
                      <div className="text-lg  font-Notion  mt-1">Over Due</div>
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
                  <div
                    id="Two"
                    className="md:ml-40 
                   "
                  >
                    <div className="mt-8  flex flex-row ">
                      <img src={done} height={15} width={30}></img>
                      <div className="text-lg font-Notion font-medium mt-1">
                        Completed
                      </div>
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
    axios.put(`${BACKENDSERVER}/IndiviualTodos/Completed`, updatedPost)
  );

  function UpdateTodo() {
    mutation.mutate({ id });
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
  return (
    <div className="font-Notion flex border-2 p-3 rounded-xl border-red-600  hover:border-red-300">
      <div>
        <div className="flex">
          <button onClick={UpdateTodo}>
            <img src={isCompleted ? done : NotDone} height={4} width={16}></img>
          </button>
          <h1 className="text-lg font-normal ml-6">{props.title}</h1>
        </div>

        <h3 className="text-xs font-extralight ml-10">{props.description}</h3>
      </div>
    </div>
  );
}

function DisplayGlobalTodosDone(props) {
  const isCompleted = props.isCompleted;
  const id = props.id;

  const mutation = useMutation((updatedPost) =>
    axios.put(`${BACKENDSERVER}/Indiviualtodos/NotCompleted`, updatedPost)
  );

  function UpdateTodo() {
    mutation.mutate({ id });
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
  return (
    <div className=" font-Notion flex mb-4 border-2 p-3 rounded-xl border-green-600  hover:border-green-300">
      <div>
        <div className="flex  ">
          <button onClick={UpdateTodo}>
            <img
              src={!isCompleted ? NotDone : done}
              height={4}
              width={25}
            ></img>
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl ml-6 font-normal line-through ">
              {props.title}
            </h1>

            <h3 className="text-xs ml-6 font-light line-through">
              {props.description}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
