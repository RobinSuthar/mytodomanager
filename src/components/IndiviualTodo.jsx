import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import Popup from "reactjs-popup";
import x from "./Images/newtick.png";
import { LeftSideNavBar } from "./NavigationBar/LeftSideNavBar";
import done from "./Images/tick.png";
import NotDone from "./Images/circleWithoutHover.png";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import editor from "./Images/editor.png";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

const events = [{ title: "Meeting", start: new Date() }];

const calendarEvents = [
  { title: "Team Meeting", start: "2025-01-22" },
  { title: "Project Deadline", start: "2025-01-23" },
];

const headerToolbar = {
  start: "prev,next today",
  center: "title",
  end: "dayGridMonth,dayGridWeek,dayGridDay",
};

const eventClassNames = (info) => {
  return "bg-Robin5 text-white   "; // Tailwind styles
};

import z from "./Images/checked.png";

const BACKENDSERVER = import.meta.env.VITE_BACKEND_SERVER;

export function DemoApp() {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={calendarEvents}
        headerToolbar={headerToolbar}
        eventClassNames={eventClassNames}
      />
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export function IndiviualTodo() {
  const [username, setUsername] = useState("");
  const [indiviualTodos, SetIndiviualTodos] = useState([]);

  const mutauion = useMutation((newUser) =>
    axios.post(`${BACKENDSERVER}/users/CreateUser`, newUser)
  );

  async function GetAllIndivualTodos() {
    const AllTodosWithGlobalType = await axios.get(
      `${BACKENDSERVER}/Indiviual/ParticulatIndiviualTodos`,
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

  return (
    <div className="flex flex-col md:flex-row  text-white font-Robin ">
      <div className=" w-64">
        <LeftSideNavBar></LeftSideNavBar>
      </div>
      <div className=" w-screen bg-Robin4">
        {!localStorage.getItem("Username") ? (
          <div className="mt-10 md:mt-52">
            <h1 className="md:text-2xl text-xl">
              Please Enter Your Name to Proceed
            </h1>

            <input
              className="w-full  mt-4 pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow "
              placeholder="Type Here..."
              type="text"
              id="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
          </div>
        ) : (
          ""
        )}

        <button onClick={SubmitData}>
          {" "}
          {!localStorage.getItem("Username") ? (
            <div className="flex gap-2 mt-2">
              <h1 className="text-2xl">Submit</h1>
              <img height={4} width={36} src={z}></img>
            </div>
          ) : (
            ""
          )}
        </button>
        {!localStorage.getItem("Username") ? (
          <></>
        ) : (
          <div className="flex  flex-col justify-center">
            <div className="flex  mt-16 ml-32">
              <div>
                <div className="h-20 mr-4  w-20">
                  <img src={editor} alt="" />
                </div>

                <div className="font-extrabold ml-4  mt-2 text-5xl text-gray-100">
                  Welcome, {localStorage.getItem("Username")}
                </div>
                <div className="m-5">
                  <div className="text-Robin5 font-bold">
                    {" "}
                    Your personalized To-Do Section!{" "}
                  </div>
                  <ol className="font-bold mt-4 text-Robin5 list-disc">
                    <li>
                      Add Tasks: Click the + New button to create a new to-do.
                      Provide a clear title, a detailed description, and set an
                      importance level (1-5) to prioritize your task
                    </li>

                    <li>
                      {" "}
                      Private Dashboard: All tasks in this section are
                      completely private to your account, ensuring you can
                      manage your responsibilities securely and without
                      distractions. Organize your tasks with ease, stay
                      productive, and take control of your personal workflow!
                    </li>
                  </ol>
                </div>
                <Popup
                  trigger={
                    <div className="flex mt-2  p-2 bg-blue-600 h-9 w-32 text-gray-300 rounded-lg ">
                      <div className="font-Notion text-sm  font-bold ml-2 ">
                        Add Todo
                      </div>
                      <div className="flex flex-col">
                        <div className="border-2 border-gray-400 h-6 ml-2"></div>
                      </div>
                      <div className="">
                        <img className="h-5 w-6  ml-1" src={x} alt="" />{" "}
                      </div>
                    </div>
                  }
                  position="down center"
                >
                  <AddIndiviualTodo></AddIndiviualTodo>
                </Popup>
                <div className="border-b-2 border-gray-700 mt-3 mr-20"></div>
              </div>
            </div>

            <div className="flex mt-4 justify-center">
              <div className="bg-Robin2 text-gray-300  rounded-3xl text-sm w-8/12 h-auto p-4 ">
                <DemoApp> </DemoApp>
              </div>
            </div>
          </div>
        )}

        <div>
          <div className=" grid grid-cols-6">
            {!localStorage.getItem("Username") ? (
              ""
            ) : (
              <></>
              // <div className="mt-8 md:ml-24  ml-8  flex flex-row ">
              //   <img src={cross} height={6} width={30}></img>
              //   <div className="text-lg  font-Bungee  mt-1">Over Due</div>
              // </div>
            )}
            {indiviualTodos.map((EachElemet) => {
              var isCompleted = EachElemet.isCompleted;
              if (!isCompleted) {
                return (
                  <div key={EachElemet._id}>
                    <div>
                      <DisplayIndiviualTodos
                        title={EachElemet.title}
                        description={EachElemet.description}
                        isCompleted={EachElemet.isCompleted}
                        id={EachElemet._id}
                      ></DisplayIndiviualTodos>{" "}
                    </div>
                  </div>
                );
              } else {
                return;
              }
            })}
          </div>

          <div>
            {!localStorage.getItem("Username") ? (
              ""
            ) : (
              <></>
              // <div className="mt-8 md:ml-24   flex flex-row ">
              //   <img src={done} height={6} width={30}></img>
              //   <div className="text-lg  font-Bungee  mt-1">Completed</div>
              // </div>
            )}
            {/* {indiviualTodos.map((EachElemet) => {
              var isCompleted = EachElemet.isCompleted;
              if (isCompleted) {
                return (
                  <div key={EachElemet._id}>
                    <DisplayIndiviualTodosDone
                      title={EachElemet.title}
                      description={EachElemet.description}
                      isCompleted={EachElemet.isCompleted}
                      id={EachElemet._id}
                    ></DisplayIndiviualTodosDone>{" "}
                  </div>
                );
              } else {
                return;
              }
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
}

function AddIndiviualTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const muation1 = useMutation((newTodod) => {
    axios.post(`${BACKENDSERVER}/Indiviual/CreateTodo`, newTodod);
  });

  function submitData() {
    muation1.mutate({
      username: localStorage.getItem("Username"),
      title: title,
      description: description,
    });
    document.querySelector("#Title").value = "";
    document.querySelector("#Description").value = "";
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  return (
    <div className=" font-Robin">
      {" "}
      <input
        className="p-1"
        placeholder="Enter Titke "
        type="text"
        id="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>{" "}
      <input
        className="p-1"
        placeholder="ENter description "
        type="text"
        id="Description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <button
        className="font-Robin text-xl hover:border-2 hover:border-green-400 p-1 rounded-2xl text-green-400"
        onClick={submitData}
      >
        {" "}
        Submit
      </button>
    </div>
  );
}

function DisplayIndiviualTodos(props) {
  const isCompleted = props.isCompleted;
  const id = props.id;

  const mutation = useMutation((updatedPost) =>
    axios.put(`${BACKENDSERVER}/IndiviualTodos/Completed`, updatedPost)
  );

  function UpdateTodo() {
    mutation.mutate({ id });
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  return (
    <div className=" font-Notion text-gray-300 bg-Robin2   flex border-2 p-3 border-Robin2 rounded-xl ">
      <div className="">
        <div className="flex mt-1">
          <button onClick={UpdateTodo}>
            <img src={isCompleted ? done : NotDone} height={8} width={16}></img>
          </button>
          <h1 className=" text-xl   font-bold  ml-6 mr-4">{props.title}</h1>
        </div>

        <h3 className="text-xs  font-extralight ml-10">{props.description}</h3>
      </div>
    </div>
  );
}

// function DisplayIndiviualTodosDone(props) {
//   const isCompleted = props.isCompleted;
//   const id = props.id;

//   const mutation = useMutation((updatedPost) =>
//     axios.put(`${BACKENDSERVER}/Indiviualtodos/NotCompleted`, updatedPost)
//   );

//   function UpdateTodo() {
//     mutation.mutate({ id });
//     setTimeout(() => {
//       window.location.reload();
//     }, 500);
//   }

//   return (
//     <div className=" flex flex-col md:ml-28 border-2  m-6 p-3 rounded-xl border-green-600  hover:border-green-300">
//       <div>
//         <div className="flex mt-1">
//           <button onClick={UpdateTodo}>
//             <img src={isCompleted ? done : NotDone} height={8} width={16}></img>
//           </button>
//           <h1 className="text-xl   font-bold  ml-6 ">{props.title}</h1>
//         </div>

//         <h3 className="text-xs  font-extralight ml-10">{props.description}</h3>
//       </div>
//     </div>
//   );
// }
