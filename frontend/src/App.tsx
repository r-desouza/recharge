import { useState } from "react";
import CrearUsuarios from "./components/CrearUsuarios";
import Navegacion from "./components/Navegacion";
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
      // <div className="">
      //   <Navegacion />
      //   <div className="container p-4">
      //     <Routes>
      //       <Route path="/CrearUsuario" element={<CrearUsuarios />} />
      //       <Route path="/edit/:id" element={<CrearUsuarios />} />
      //     </Routes>
      //   </div>
      // </div>
      <CrearUsuarios/>
  );
}

export default App;
