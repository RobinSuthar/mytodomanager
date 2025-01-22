import { Selection } from "./Selection";

export function LeftSideNavBar() {
  return (
    <div className="w-64 p-2 text-gray-400 h-screen bg-Robin3 ">
      <div className=" font-Notion flex  md:justify-start md:text-left m-2 gap-2  md:mt-5">
        <img
          className="h-6 w-6  rounded-md "
          src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
          alt="nature image"
        />
        {localStorage.getItem("Username")
          ? localStorage.getItem("Username")
          : "Random"}
      </div>

      <Selection></Selection>
    </div>
  );
}
