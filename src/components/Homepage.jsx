import { useEffect, useState } from "react";
import axios from "axios";

export function HomePage() {
  const [globaltodos, setGlobalTodos] = useState([]);
  async function GetAllTodos() {
    const AllTodosWithGlobalType = await axios.get(
      "http://localhost:3001/GlobalTodos/AllTodos"
    );

    setGlobalTodos(AllTodosWithGlobalType.data.allTodosWithGlobalType);
  }
  useEffect(function () {
    GetAllTodos();
  }, []);

  return (
    <div>
      <NameOfTheWebsite name="MyWebsite"></NameOfTheWebsite>

      <div id="LeftSideDiv w-48">
        <nav className="p m-5 w-11">
          <CustomButton name={"Global"}> </CustomButton>
          <CustomButton name={"Personal"}> </CustomButton>
          <CustomButton name={"Organziton"}> </CustomButton>
        </nav>
      </div>
      <div id="RightSideDiv " className="grid grid-rows-3 grid-cols-3 gap-4">
        {globaltodos.map((EachElemet) => {
          return (
            <div key={EachElemet._id}>
              <DisplayGlobalTodos
                title={EachElemet.title}
                description={EachElemet.description}
                isCompleted={EachElemet.isCompleted}
              ></DisplayGlobalTodos>{" "}
            </div>
          );
        })}
        <DisplayGlobalTodos
          title={"ASdas"}
          description={"asdas"}
          isCompleted={"Aasdsd"}
        ></DisplayGlobalTodos>
        <DisplayGlobalTodos
          title={"ASdas"}
          description={"asdas"}
          isCompleted={"Aasdsd"}
        ></DisplayGlobalTodos>
      </div>
    </div>
  );
}

function NameOfTheWebsite(pros) {
  return <div className="text-5xl flex justify-center m-6">{pros.name}</div>;
}

function CustomButton(props) {
  // eslint-disable-next-line react/prop-types
  return <button className="m-4 flex flex-col">{props.name}</button>;
}

function DisplayGlobalTodos(props) {
  return (
    <div className="gap-6 m-6 p-3  text-center border-4 border-black">
      <h1 className="text-4xl">{props.title}</h1>
      <h3 className="text-2xl">{props.description}</h3>
      <h3 className="text-2xl">{props.isCompleted}</h3>
    </div>
  );
}
