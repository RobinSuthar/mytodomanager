import x from "../Images/globe.png";
import y from "../Images/personal.png";
import z from "../Images/orgnaization.png";

import { Link } from "react-router-dom";

export function Selection() {
  return (
    <div className="font-Bungee flex flex-col  text-xl text-left">
      <div className="  flex flex-row justify-center  mt-4 mr-14">
        <Link to="/">
          <div className="text-lg hover:underline   hover:text-xl hover:border-2 p-3 hover:border-green-500 rounded-2xl   ml-2 mt-2">
            {" "}
            Global{" "}
          </div>
        </Link>
      </div>
      <div className="flex flex-row justify-center mt-1 mr-12">
        <Link to="/Personal">
          <div className="text-lg hover:underline hover:text-xl hover:border-2 p-3 hover:border-green-500 rounded-2xl  ml-2 mt-1">
            {" "}
            Personal{" "}
          </div>
        </Link>
      </div>

      <div className="flex text-left flex-row justify-center mt-3 mr-12">
        <Link to="/Organization" className="">
          <div className="text-lg hover:underline hover:text-xl hover:border-2 p-3 hover:border-green-500 rounded-2xl    ml-2 mt-1">
            {" "}
            Company{" "}
          </div>
        </Link>
      </div>
    </div>
  );
}
