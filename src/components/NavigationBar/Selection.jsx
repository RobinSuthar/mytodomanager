import { Link } from "react-router-dom";

export function Selection() {
  return (
    <div className="font-Notion text-gray-400  flex md:flex-col  text-sm md:text-xl text-left">
      <div className="  flex flex-row  justify-left md  mt-4 mr-14">
        <Link to="/">
          <div className="text-base md:text-lg hover:underline   hover:text-xl hover:bg-gray-900  p-1 md:p-3  rounded-xl mt-1   ml-2 md:mt-2">
            {" "}
            Global{" "}
          </div>
        </Link>
      </div>
      <div className="flex flex-row justify-left  mt-1 mr-12">
        <Link to="/personal">
          <div className="text-base  md:text-lg     p-1 md:p-3 hover:bg-gray-900  rounded-2xl  ml-2 mt-4 md:mt-1">
            {" "}
            Personal{" "}
          </div>
        </Link>
      </div>

      <div className="flex text-left flex-row justify-left  mt-3 mr-12">
        <Link to="/organization" className="">
          <div className=" text-base md:text-lg hover:underline hover:text-xl hover:border-2  p-1 md:p-3 hover:border-green-500 rounded-2xl mt-2    ml-2 md:mt-1">
            {" "}
            Company{" "}
          </div>
        </Link>
      </div>
    </div>
  );
}
