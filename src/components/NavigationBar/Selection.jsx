import { Link } from "react-router-dom";

export function Selection() {
  return (
    <div className="font-Bungee flex flex-col md:flex-row md:gap-8 text-sm md:text-lg text-left p-5">
      <div className="flex flex-col items-center md:items-start">
        <Link to="/">
          <div className="text-base md:text-lg hover:underline hover:text-xl hover:border-2 p-2 md:p-4 hover:border-blue-500 rounded-lg bg-white shadow-md hover:shadow-lg transition-all">
            Global
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-center md:items-start mt-4 md:mt-0">
        <Link to="/personal">
          <div className="text-base md:text-lg hover:underline hover:text-xl hover:border-2 p-2 md:p-4 hover:border-blue-500 rounded-lg bg-white shadow-md hover:shadow-lg transition-all">
            Personal
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-center md:items-start mt-4 md:mt-0">
        <Link to="/organization">
          <div className="text-base md:text-lg hover:underline hover:text-xl hover:border-2 p-2 md:p-4 hover:border-blue-500 rounded-lg bg-white shadow-md hover:shadow-lg transition-all">
            Company
          </div>
        </Link>
      </div>
    </div>
  );
}
