import x from "../Images/globe.png";
import y from "../Images/personal.png";
import z from "../Images/orgnaization.png";

import { Link } from "react-router-dom";

export function Selection() {
  return (
    <div>
      <div className="flex flex-row justify-center  mt-4 mr-14">
        <Link to="/">
          <img height={6} width={35} src={x}></img>
        </Link>
        <div className="text-xs   ml-2 mt-2"> Global </div>
      </div>
      <div className="flex flex-row justify-center mt-1 mr-12">
        <Link to="/Personal">
          <img height={6} width={19} src={y}></img>
        </Link>
        <div className="text-xs   ml-2 mt-1"> Personal </div>
      </div>

      <div className="flex flex-row justify-center mt-3 mr-12">
        <Link to="/Organization" className="mt-1">
          <img height={6} width={19} src={z}></img>
        </Link>
        <div className="text-xs   ml-2 mt-1"> Personal </div>
      </div>
    </div>
  );
}
