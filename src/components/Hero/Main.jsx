import { Time } from "./Time";
import newtick from "../Images/newtick.png";
export function Main() {
  return (
    <div className=" md:ml-2 mt-1 text-center md:text-left font-Notion flex text-gray-500 gap-2  text-lg align-middle  font ">
      <div className="mt-3">
        <img className="w-6 h-5" src={newtick} alt="" />
      </div>
      <div className="mt-2 mb-2">
        <Time></Time>
      </div>
    </div>
  );
}
