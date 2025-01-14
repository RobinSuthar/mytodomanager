import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
export function Organization() {
  const [companyName, setCompanyName] = useState("");
  const [companyPin, setCompanyPin] = useState("");

  const mutation = useMutation((newTodo) =>
    axios.post("http://localhost:3001/Organzations/CreateOrganztion", newTodo)
  );
  function HandleCompanyinfo() {
    //Logic To Upload info into Databse
    mutation.mutate({ companyName, companyPin });
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Enter the Name Of you Company"
        onChange={(e) => {
          setCompanyName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Set up Pin"
        onChange={(e) => {
          setCompanyPin(e.target.value);
        }}
      />
      <button onClick={HandleCompanyinfo}>Submit Company infoamtion </button>
    </div>
  );
}

// app.post("/Company/Todos", async function (req, res) {
//     const { name, author, title, description, importance, tag } = req.body;
//     const ParsingCompanyTodo = CompanySchema.safeParse(req.body);
//     console.log(ParsingCompanyTodo);
//     if (!ParsingCompanyTodo.success) {
//       return res.json({
//         msg: "Thats incorrect format to send a compnay Todo",
//       });
//     }
