import axios from "axios";
import { useState } from "react";
import done from "../Images/tick.png";
import NotDone from "../Images/circleWithoutHover.png";
import tickiamge from "../Images/newtick.png";
import { useMutation } from "react-query";
import randompic from "../Images/Random.png";

const BACKENDSERVER = import.meta.env.VITE_BACKEND_SERVER;

export function DisplayAllCompanyTodo() {
  const [CompanyTodos, SetCompanyTodos] = useState([]);

  useState(() => {
    GetAllTodos();
  }, []);
  async function GetAllTodos() {
    const AllTodos = await axios.get(`${BACKENDSERVER}/Company/AllTodos`, {
      headers: { Companyname: localStorage.getItem("Companyname") },
    });

    SetCompanyTodos(AllTodos.data.allTodosByCompany);
  }
  return (
    <div>
      <div className="flex flex-row  font-Notion  ">
        {!localStorage.getItem("Companyname") ? (
          <></>
        ) : (
          <></>
          // <div className="flex flex-row   md:ml-4 ml-4">
          //   <div className="mt-8  flex flex-row">
          //     <div>
          //       <img src={tickiamge} height={1} width={26}></img>
          //     </div>
          //     <div className="text-sm font-medium mt-1">Over Due</div>
          // //   </div>
          //   {/* <div className="mt-8  flex flex-row ml-24 md:ml-40">
          //     <div>
          //       <img src={done} height={1} width={26}></img>
          //     </div>
          //     <div className="text-sm font-medium mt-1">Completed</div>
          //   </div> */}
          // </div>
        )}
      </div>
      <div className="ml-4">
        <div className="grid grid-cols-3 gap-8">
          {CompanyTodos.map((EachElemet) => {
            var isCompleted = EachElemet.isCompleted;
            if (!isCompleted) {
              return (
                <div className="" key={EachElemet._id}>
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

        {/* <div>
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
        </div> */}
      </div>
    </div>
  );
}

function DisplayTodos(props) {
  const isCompleted = props.isCompleted;
  const id = props.id;
  const mutation = useMutation((updatedPost) =>
    axios.put(`${BACKENDSERVER}/Company/isCompleted`, updatedPost)
  );

  function UpdateTodo() {
    mutation.mutate({ id });
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  return (
    <div className="font-Notion w-80 border-2  text-gray-300 bg-Robin2 shadow-2xl h-56   border-Robin2 rounded-3xl">
      <div className=" rounded-3xl text-l">
        <div className="bg-Robin3 rounded-xl flex justify-center ">
          <div className="flex flex-col justify-center   h-14    ">
            <h1 className="text-2xl text-center   font-medium ">
              {props.title}
            </h1>
            <h3 className="text-xs text-center   ">{props.author}</h3>
          </div>
        </div>
        <div>
          <div className=" mt-4 ">
            <h3 className="text-lg ml-6"> {props.description}</h3>

            <h3 className="text-lg ml-6">{props.importance}</h3>
            <h3 className="text-lg  ml-6">{props.tag}</h3>
            <button
              className="flex p-2   mt-4  ml-5 bg-Robin3 h-9 w-30 hover:bg-green-400 text-gray-300 rounded-lg "
              onClick={UpdateTodo}
            >
              <div className="font-Notion text-sm  font-bold ml-2 ">Done</div>
              <div className="flex flex-col">
                <div className="border-2 border-gray-400 h-6 ml-2"></div>
              </div>
              <img className="h-6 w-6 " src={tickiamge} alt="" />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// function DisplayTodosDone(props) {
//   const isCompleted = props.isCompleted;
//   const id = props.id;

//   const mutation = useMutation((updatedPost) =>
//     axios.put(`${BACKENDSERVER}/Company/NotCompleted`, updatedPost)
//   );

//   function UpdateTodo() {
//     mutation.mutate({ id });
//     setTimeout(() => {
//       window.location.reload();
//     }, 500);
//   }

//   return (
//     <div>
//       <div className="gap-6 m-6 p-3  text-left   mb-4 border-2  rounded-xl border-green-600  hover:border-green-300">
//         <div className="flex mt-2">
//           <button onClick={UpdateTodo}>
//             <img src={isCompleted ? done : NotDone} height={8} width={16}></img>
//           </button>
//           <h1 className="text-xl   font-bold ml-6">{props.title}</h1>
//         </div>
//         <h3 className="text-xs ml-10"> Description: {props.description}</h3>

//         <h3 className="text-xs font-semibold ml-10">Author : {props.author}</h3>
//         <h3 className="text-xs ml-10">Priorty : {props.importance}</h3>
//         <h3 className="text-xs ml-10">Tag: {props.tag}</h3>
//       </div>
//     </div>
//   );
// }
