import { Time } from "./Time";
import newtick from "../Images/newtick.png";
export function Main() {
  return (
    <div className=" md:ml-2 text-center md:text-left font-Notion flex text-gray-500 gap-2  text-lg align-middle mt-2 font ">
      <div className="mt-1">
        <img className="w-6 h-5" src={newtick} alt="" />
      </div>
      <div>
        <Time></Time>
      </div>
    </div>
  );
}
