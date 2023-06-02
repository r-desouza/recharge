import './App.css';
import {Routes, Route} from 'react-router-dom';

import CrearUsuarios from './components/CrearUsuarios'
import ListaUsuario from './components/ListaUsuario'
import Navegacion from './components/Navegacion';



function App() {
  return (
    <div className="">
      <Navegacion/>
        <div className="container p-4">
          <Routes>
            <Route path="/" element={<ListaUsuario/>} />
            <Route path="/CrearUsuario" element={<CrearUsuarios/>} />
            <Route path="/edit/:id" element={<CrearUsuarios/>} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
