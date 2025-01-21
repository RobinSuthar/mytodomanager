import { Link } from "react-router-dom";
import Home from "../Images/home.png";
import personal from "../Images/nnn.png";
import store from "../Images/store.png";
import setting from "../Images/setting.png";

export function Selection() {
  return (
    <div className="font-Notion text-gray-400   flex md:flex-col mt-3  text-sm md:text-xl text-left">
      <div className="  flex flex-row  justify-left md  mt-1 hover:bg-Robin3 p-2 hover:rounded-lg">
        <Link to="/">
          <div className="flex flex-row">
            <div className="mt-1">
              <img className="h-6 w-6" src={Home} alt="" />
            </div>
            <div className="text-sm md:text-sm font-semibold       rounded-xl mt-1   ml-2 md:mt-2">
              {" "}
              Global{" "}
            </div>
          </div>
        </Link>
      </div>
      <div className="flex flex-row justify-left  mt-2 hover:bg-Robin3  hover:rounded-lg p-2">
        <Link to="/personal">
          <div className="flex flex-row">
            <div>
              <img className="h-6 w-6" src={personal} alt="" />
            </div>
            <div className="text-sm font-semibold  md:text-sm   rounded-2xl  ml-2 mt-4 md:mt-1">
              {" "}
              Personal{" "}
            </div>
          </div>
        </Link>
      </div>

      <div className="flex text-left flex-row justify-left  mt-2 hover:bg-Robin3  hover:rounded-lg p-2">
        <Link to="/organization" className="">
          <div className="flex flex-row">
            <div>
              <img className="h-6 w-6" src={store} alt="" />
            </div>
            <div className="  md:text-sm  font-semibold    rounded-2xl mt-2    ml-2 md:mt-1">
              Company{" "}
            </div>
          </div>
        </Link>
      </div>

      <div className="flex text-left flex-row justify-left hover:bg-Robin3  p-2 hover:rounded-lg mt-2 ">
        <Link to="/organization" className="">
          <div className="flex flex-row">
            <div>
              <img className="h-6 w-6" src={setting} alt="" />
            </div>
            <div className="  md:text-sm  font-semibold    rounded-2xl mt-2    ml-2 md:mt-1">
              Setting{" "}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
