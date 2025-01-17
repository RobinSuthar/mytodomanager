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
  const [counter, setCounter] = useState(0);

  async function GetAllTodos() {
    const AllTodosWithGlobalType = await axios.get(
      `${BACKENDSERVER}/GlobalTodos/AllTodos`
    );
    setGlobalTodos(AllTodosWithGlobalType.data.allTodosWithGlobalType);
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    GetAllTodos();
  }, []);

  useEffect(() => {
    GetAllTodos();
  }, [counter]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      {loading && (
        <div className="flex justify-center mt-80 md:mt-60">
          <WhisperSpinner size={50} color="#3b82f6" />
        </div>
      )}
      {!loading && (
        <div className="md:grid md:grid-cols-[14rem,8fr]">
          <div>
            <div
              id="LeftSideDiv"
              className="w-48 bg-white shadow-lg p-5 rounded-md"
            >
              <LeftSideNavBar />
            </div>
          </div>
          <div>
            <div id="RightSideDiv" className="p-5">
              <div className="flex-col justify-center">
                <Main />
                <div className="flex flex-col md:flex-row md:gap-20 gap-12 md:ml-12 mt-8">
                  <div id="One" className="">
                    <div className="flex items-center gap-2">
                      <img src={tickiamge} alt="Overdue" className="w-6 h-6" />
                      <div className="text-lg font-bold text-red-600">
                        Over Due
                      </div>
                    </div>
                    {globaltodos.map((EachElement) => {
                      if (!EachElement.isCompleted) {
                        return (
                          <div key={EachElement._id} className="mt-4">
                            <DisplayGlobalTodos
                              id={EachElement._id}
                              title={EachElement.title}
                              description={EachElement.description}
                              isCompleted={EachElement.isCompleted}
                              owner={EachElement.type}
                              time={EachElement.createdAt}
                            />
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <div id="Two" className="">
                    <div className="flex items-center gap-2">
                      <img src={done} alt="Completed" className="w-6 h-6" />
                      <div className="text-lg font-bold text-green-600">
                        Completed
                      </div>
                    </div>
                    {globaltodos.map((EachElement) => {
                      if (EachElement.isCompleted) {
                        return (
                          <div key={EachElement._id} className="mt-4">
                            <DisplayGlobalTodosDone
                              id={EachElement._id}
                              title={EachElement.title}
                              description={EachElement.description}
                              isCompleted={EachElement.isCompleted}
                              owner={EachElement.type}
                              time={EachElement.createdAt}
                            />
                          </div>
                        );
                      }
                      return null;
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
  const mutation = useMutation((updatedPost) =>
    axios.put(`${BACKENDSERVER}/IndiviualTodos/Completed`, updatedPost)
  );

  function UpdateTodo() {
    mutation.mutate({ id: props.id });
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  return (
    <div className="bg-white border-2 border-red-500 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4">
        <button onClick={UpdateTodo} className="focus:outline-none">
          <img
            src={props.isCompleted ? done : NotDone}
            alt="Toggle Status"
            className="w-6 h-6"
          />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-gray-800">{props.title}</h1>
          <p className="text-sm text-gray-600">{props.description}</p>
        </div>
      </div>
    </div>
  );
}

function DisplayGlobalTodosDone(props) {
  const mutation = useMutation((updatedPost) =>
    axios.put(`${BACKENDSERVER}/Indiviualtodos/NotCompleted`, updatedPost)
  );

  function UpdateTodo() {
    mutation.mutate({ id: props.id });
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  return (
    <div className="bg-white border-2 border-green-500 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4">
        <button onClick={UpdateTodo} className="focus:outline-none">
          <img
            src={!props.isCompleted ? NotDone : done}
            alt="Toggle Status"
            className="w-6 h-6"
          />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-gray-800 line-through">
            {props.title}
          </h1>
          <p className="text-sm text-gray-600 line-through">
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
}
