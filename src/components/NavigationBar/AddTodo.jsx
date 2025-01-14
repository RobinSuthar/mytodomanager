import x from "../Images/icons8-add-48.png";
export function AddTodo() {
  return (
    <div className="flex justify-center mt-7 mr-14">
      <button>
        <img height={16} width={20} src={x} alt="" />
      </button>
      <div className="text-xs font-semibold text-green-400 ml-2 mt-1">
        Add Todo
      </div>
    </div>
  );
}
