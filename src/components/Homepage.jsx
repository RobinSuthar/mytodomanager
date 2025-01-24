import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { LeftSideNavBar } from "./NavigationBar/LeftSideNavBar";
import { Main } from "./Hero/Main";

import done from "./Images/tick.png";
import NotDone from "./Images/wrong.png";
import { WhisperSpinner } from "react-spinners-kit";

import Banner2 from "./Images/hcs2.png";

import { AddTodo } from "./NavigationBar/AddTodo";

import { Selection } from "./NavigationBar/Selection";
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
    <div className=" h-screen md:min-h-screen md:max-h-full bg-Robin">
      {loading && (
        <div className="flex  justify-center  ">
          <div className="mt-80">
            <WhisperSpinner></WhisperSpinner>
          </div>
        </div>
      )}
      {!loading && (
        <div className="md:grid   bg-black md:grid-cols-[16rem,8fr] text-white  ">
          <div className="bg-Robin2 border-r-2 border-gray-700 ">
            <div
              id="LeftSideDiv
              "
            >
              <div className=" p-2 text-gray-400 md:min-h-screen md:max-h-full bg-Robin3 ">
                <div className=" font-Notion flex  md:justify-start md:text-left m-2 gap-2  md:mt-5">
                  <img
                    className="h-6 w-6  rounded-md "
                    src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                    alt="nature image"
                  />
                  {localStorage.getItem("Username")
                    ? localStorage.getItem("Username")
                    : "Random"}
                </div>

                <Selection></Selection>
              </div>
            </div>
          </div>
          <div className="min-h-screen max-h-full bg-Robin">
            <div
              id="RightSideDiv "
              className="font-Notion  bg-Robin4 text-gray-300 gap-2 "
            >
              <div className="flex-col h-full bg-Robin4 justify-center md:ml-26  ">
                <Main></Main>
                <div className="max-w-full border-b-2 border-Robin2">
                  <img
                    className="h-20  md:h-36 md:w-full w-screen"
                    src={Banner2}
                    alt=""
                  />
                </div>
                <div className="flex  flex-col p-1 justify-center mt-2 md:mt-10 md:ml-24 ml-2">
                  <div className="font-Notion text-3xl font-extrabold">
                    <div>GLOBAL TODO</div>
                  </div>
                  <div className="md:mr-48 mb-2 p-1">
                    Stay organized with your to-do website! The Global To-Do
                    Page allows everyone to view and interact with tasks created
                    today, fostering collaboration and accountability. Tasks are
                    automatically categorized as uncompleted . Marking a task as
                    done is as simple as clicking the "X," instantly moving it
                    to the Vanish section. focus on what's important, and
                    celebrate achievements—all while staying on top of their
                    daily responsibilities!
                  </div>
                  <AddTodo></AddTodo>
                  <div className="border-b-2 border-gray-700 mt-2 mr-20"></div>
                </div>
                <div className="flex flex-row justify-center md:gap-20 gap-12 md:ml-24">
                  <div
                    id="One"
                    className="grid  grid-cols-2 ml-  lg:grid-cols-6 mb-2  gap-2 lg:gap-6"
                  >
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
                  {/* <div
                    id="Two"
                    className="md:ml-40 grid  grid-cols-2  gap-6
                   "
                  >
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
                  </div> */}
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
    <div className=" mt-2 mb-2 font-Notion text-gray-300 bg-Robin2   flex border-2 p-3 border-Robin2 rounded-xl ">
      <div className="">
        <div className="flex">
          <button onClick={UpdateTodo}>
            <img
              className="md:h-4 md:w-4 h-3 w-3"
              src={isCompleted ? done : NotDone}
            ></img>
          </button>
          <h1 className="md:text-lg text-2xl font-normal ml-6">
            {props.title}
          </h1>
        </div>

        <h3 className="text-base md:text-xs font-extralight ml-10">
          {props.description}
        </h3>
      </div>
    </div>
  );
}

// function DisplayGlobalTodosDone(props) {
//   const isCompleted = props.isCompleted;
//   const id = props.id;

//   const mutation = useMutation((updatedPost) =>
//     axios.put(`${BACKENDSERVER}/Indiviualtodos/NotCompleted`, updatedPost)
//   );

//   function UpdateTodo() {
//     mutation.mutate({ id });
//     setTimeout(() => {
//       window.location.reload();
//     }, 100);
//   }
//   return (
//     <div className=" bg-Robin2 font-Notion flex mb-4 border-2 p-3 rounded-xl border-green-600  hover:border-green-300">
//       <div>
//         <div className="flex  ">
//           <button onClick={UpdateTodo}>
//             <img
//               src={!isCompleted ? NotDone : done}
//               height={4}
//               width={25}
//             ></img>
//           </button>
//           <div className="flex flex-col">
//             <h1 className="text-xl ml-6 font-normal line-through ">
//               {props.title}
//             </h1>

//             <h3 className="text-xs ml-6 font-light line-through">
//               {props.description}
//             </h3>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
