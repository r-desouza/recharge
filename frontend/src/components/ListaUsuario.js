import React from "react";
import { Link } from "react-router-dom";

const ListaUsuario = () => {
  return (
    <div>
      <div class="card">
  <img src={"https://i1.sndcdn.com/avatars-000147616246-ociwr4-t500x500.jpg"} class="card-img-top" alt="..."/>

  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <Link className="btn btn-primary" to="/CrearUsuario">
                  CREAR Usuarios
                </Link>
  </div>
</div>

<div class="card" aria-hidden="true">
  <img src={"https://i1.sndcdn.com/avatars-000147616246-ociwr4-t500x500.jpg"} class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title placeholder-glow">
      <span class="placeholder col-6"></span>
    </h5>
    <p class="card-text placeholder-glow">
      <span class="placeholder col-7"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-6"></span>
      <span class="placeholder col-8"></span>
    </p>
  </div>
</div>
    </div>
  )
};

export default ListaUsuario;