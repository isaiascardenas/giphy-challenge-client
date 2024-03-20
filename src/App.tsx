import { Routes, Route } from "react-router-dom";
import List from "./components/List";
import Edit from "./components/Edit";
import Create from "./components/Create";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<List />} />
        <Route
          path="/editar/:id"
          element={
              <Edit />
          }
        />
        <Route
          path="/crear"
          element={
              <Create />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
