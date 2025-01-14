import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { IndiviualTodo } from "./IndiviualTodo";
import { LeftSideNavBar } from "./NavigationBar/LeftSideNavBar";
import { Main } from "./Hero/Main";
import tickiamge from "./Images/wrong.png";
import done from "./Images/tick.png";
import NotDone from "./Images/CircleWithoutHover.png";

export function HomePage() {
  const [globaltodos, setGlobalTodos] = useState([]);
  const [buttonPressed, SetButtonPressed] = useState(0);
  const [counter, setCounter] = useState(0);
  async function GetAllTodos() {
    const AllTodosWithGlobalType = await axios.get(
      "http://localhost:3001/GlobalTodos/AllTodos"
    );

    setGlobalTodos(AllTodosWithGlobalType.data.allTodosWithGlobalType);
  }

  useEffect(function () {
    console.log("INTIAL MOUNT OF USEEFFECT");
    GetAllTodos();
  }, []);

  useEffect(
    function () {
      console.log("USE EFFECT CALLED AGAIN BASED ON COUNTER");
      GetAllTodos();
    },

    [counter]
  );

  useEffect(
    function () {
      console.log("USE EFFEq");
      GetAllTodos();
    },

    [counter]
  );

  return (
    <div className="grid grid-cols-[14rem,8fr]">
      <div id="LeftSideDiv w-48">
        <LeftSideNavBar></LeftSideNavBar>
        <nav className="p m-5 w-11"></nav>
      </div>

      <div id="RightSideDiv " className="">
        <div className="flex-col justify-center ml-40 ">
          <Main></Main>
          <div className="mt-8  flex flex-row ">
            <img src={tickiamge} height={6} width={26}></img>
            <div className="text-sm font-medium mt-1">Over Due</div>
          </div>

          <div></div>
          {globaltodos.map((EachElemet) => {
            console.log(EachElemet);
            var isCompleted = EachElemet.isCompleted;
            if (isCompleted) {
              return (
                <div key={EachElemet._id} className="mt-4">
                  <DisplayGlobalTodos
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
          <div className="mt-8  flex flex-row ">
            <img src={done} height={6} width={26}></img>
            <div className="text-sm font-medium mt-1">Completed</div>
          </div>
          {globaltodos.map((EachElemet) => {
            var isCompleted = EachElemet.isCompleted;
            const time = EachElemet.createdAt;
            console.log(time);
            if (!isCompleted) {
              return (
                <div key={EachElemet._id} className="mt-4">
                  <DisplayGlobalTodos
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
      </div>
      <div>asdasd</div>
    </div>
  );
}

function DisplayGlobalTodos(props) {
  const isCompleted = props.isCompleted;
  return (
    <div className="flex ">
      <div>
        <div className="flex ">
          <button>
            <img src={isCompleted ? NotDone : done} height={4} width={16}></img>
          </button>
          <h1 className="text-sm ml-6">{props.title}</h1>
        </div>

        <h3 className="text-xs ml-10">{props.description}</h3>
      </div>

      <div>
        <div className="ml-56">
          <div className="flex ">
            <h1 className="text-sm ">{props.owner}</h1>
          </div>

          <h3 className="text-xs ">{props.time}</h3>
        </div>
      </div>
    </div>
  );
}
