class AppProducto extends HTMLElement {
  constructor() {
    super();
   
    this.attachShadow({ mode: "open" });

 const template = document.createElement('template');

//Dentro de la plantilla situamos la estructura del componente
template.innerHTML = `
 <style>
        .producto {
          display: flex;
          font-family: Verdana;
          width: 750px;
          margin-bottom: 10px;
        }

        img {
          width: 250px;
          border-radius: 10px 0 0 10px;
        }

        .container {
          border: 1px solid black;
          border-radius: 0 10px 10px 0;
          padding: 10px;
          width: 100%;
        }

        h3 {
          color: #41705;
        }

        .btn {
          cursor: pointer;
          border: none;
          padding: 10px;
          border-radius: 10px;
          float: right;
          background-color: yellow;
        }

        .btn:hover {
          background-color: #3e8e41;
        }
      </style>

      <div class="producto">
        <img></img>
        <div class="container">
          <h3>${this.getAttribute("titulo")}</h3>
          <p class="precio">${this.getAttribute("precio")}</p>
          <p class="descripcion">${this.getAttribute("descripcion")}</p>
          <p class="tipo">${this.getAttribute("tipo")}</p>
          <div class="item-btn-purchase">
            <button id="btn-purchase">COMPRAR</button>
          </div>
        </div>
      </div>


`;

this.shadowRoot.appendChild(template.content.cloneNode(true));
}

static get observedAttributes() {
  return ["id","titulo","precio","descripcion","img","tipo"];
}



connectedCallback () { 


  let titulo = this.getAttribute("producto-titulo");
  this.shadowRoot.querySelector("h3").innerHTML = titulo;

  let precio = this.getAttribute("producto-precio");
  // Asignar los valores a los elementos del componente
  this.shadowRoot.querySelector(".precio").innerHTML = "Precio: " + precio + " € ";

  let descripcion = this.getAttribute("producto-descripcion");
  this.shadowRoot.querySelector(".descripcion").innerHTML = descripcion;

  //recuperamos la imagen 
  let img = this.getAttribute("producto-img");
  this.shadowRoot.querySelector("img").setAttribute("src" , img);
  this.shadowRoot.querySelector("img").setAttribute("alt" , img);
  //recuperamos tipo 
  let tipo = this.getAttribute("producto-tipo");
  this.shadowRoot.querySelector(".tipo").innerHTML = tipo;

  
    this.shadowRoot.getElementById("btn-purchase").addEventListener("click", this);
    
 }
 handleEvent(event) {
  if (event.type === "click") {

    let plato = this.shadowRoot.querySelector("h3").innerHTML;
    let precio = parseFloat(this.shadowRoot.querySelector(".precio").innerHTML.replace("Precio: ", "").replace(" €", ""));//metodo para eliminar  "Precio: " y " €"
    let id = this.getAttribute("producto-id");
    let imagen  =  this.shadowRoot.querySelector("img").src;

    const messageEvent = new CustomEvent("anadirPlato", {
      detail: { 
          titulo: plato,
          precio: precio,
          id: id,
          imagen: imagen    
      },   
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(messageEvent);
   
  }
}

}

customElements.define('app-producto', AppProducto);