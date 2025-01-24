import { Link } from "react-router-dom";
import Home from "../Images/home.png";
import personal from "../Images/nnn.png";
import store from "../Images/store.png";
import setting from "../Images/setting.png";

export function Selection() {
  return (
    <div className="font-Notion  text-gray-400   flex md:flex-col mt-3  text-sm md:text-xl text-left">
      <div className="  flex flex-row  justify-left md  md:mt-1 hover:bg-Robin3 p-2 hover:rounded-lg">
        <Link to="/">
          <div className="flex flex-row">
            <div className="mt-1">
              <img className="md:h-6 mr-3 md:w-6 h-7 w-12" src={Home} alt="" />
            </div>
            <div className="md:text-sm text-base font-semibold  mt-3     rounded-xl    md:mt-2">
              {" "}
              Global{" "}
            </div>
          </div>
        </Link>
      </div>
      <div className="flex flex-row justify-left  mt-1 hover:bg-Robin3  hover:rounded-lg p-2">
        <Link to="/personal">
          <div className="flex flex-row">
            <div>
              <img
                className="md:h-6 mr-3 md:w-6 h-7 w-12"
                src={personal}
                alt=""
              />
            </div>
            <div className="text-base font-semibold  mt-2 md:text-sm   rounded-2xl  md:mt-1 ">
              {" "}
              Personal{" "}
            </div>
          </div>
        </Link>
      </div>

      <div className="flex text-left flex-row justify-left  mt-1 hover:bg-Robin3  hover:rounded-lg p-2">
        <Link to="/organization" className="">
          <div className="flex flex-row">
            <div>
              <img
                className="md:h-6  mr-3 md:w-6 h-7 w-12"
                src={store}
                alt=""
              />
            </div>
            <div className=" text-base  md:text-sm  mt-2 font-semibold    rounded-2xl md:mt-2     ">
              Company{" "}
            </div>
          </div>
        </Link>
      </div>

      <div className="flex text-left flex-row justify-left hover:bg-Robin3  p-2 hover:rounded-lg mt-1 ">
        <Link to="/organization" className="">
          <div className="flex flex-row">
            <div>
              <img
                className="md:h-6 mr-3 md:w-6 h-7  w-12"
                src={setting}
                alt=""
              />
            </div>
            <div className="text-base md:text-sm  mt-2 font-semibold    rounded-2xl md:mt-2">
              Setting{" "}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
