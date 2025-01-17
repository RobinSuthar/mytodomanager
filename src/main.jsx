import { createRoot } from "react-dom/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { HomePage } from "./components/Homepage.jsx";
import { IndiviualTodo } from "./components/IndiviualTodo.jsx";
import { Organization } from "./components/Organization.jsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/personal" element={<IndiviualTodo />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </QueryClientProvider>
);
