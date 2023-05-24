class AppComanda extends HTMLElement {
  constructor() {
    super();
    this.platos = {}; // Objeto para almacenar los platos agregados
    this.total = 0;

    this.attachShadow({ mode: "open" });

    // Creamos un template para el componente
    const template = document.createElement("template");

    // Definimos el HTML del componente
    template.innerHTML = `
      <style>
        .carrito-item {
          border: 1px solid;
          width: 600px;
          border-radius: 10px;
        }
        .img {
          width: 50px;
          height: 50px;
        }
        :host {
          display: block;
          font-family: Arial, sans-serif;
          padding: 20px;
        }

        h1 {
          font-size: 24px;
          margin-bottom: 10px;
        }

        #total {
          font-size: 18px;
          font-weight: bold;
          margin-top: 10px;
        }

        .plato {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 5px;
        }

        .plato button {
          background-color: #ff0000;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
        }

        .plato button:hover {
          background-color: #cc0000;
        }
      </style>

      <div class="carrito-item">
        <h3>Comanda</h3>
        <ul></ul>
        <p id="total">Total: $0</p>
      </div>
    `;

    // Añadimos el template al Shadow DOM del componente
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    document.addEventListener("anadirPlato", (evento) => {
      this.gestionarPlato(evento);
    });
  }

  gestionarPlato(evento) {

    // Recollim atributs i muntem objecte
    let objPlato = { platoTitulo: evento.detail.titulo, 
      precio: parseFloat(evento.detail.precio), 
      cantidad: 1 , 
      id: evento.detail.id, 
      imagen: evento.detail.imagen};

    // Mirem si plat està o no al DOM-comanda
    let platoComanda = this.shadowRoot.getElementById(objPlato.id);

    if(platoComanda == null) {
      this.crearPlat(objPlato);

    } else {
      let quantitat = platoComanda.textContent;
      let position = quantitat.indexOf(")");
      quantitat = parseInt(quantitat.substring(position-1, position));
      quantitat++;
      platoComanda.textContent = `${objPlato.platoTitulo} (x${quantitat}) - $${(objPlato.precio * objPlato.cantidad).toFixed(2)}`;
    }

  // Sumar el precio al total
  this.total += objPlato.precio;

  // Actualizar el total en el DOM
  this.shadowRoot.querySelector("#total").innerText = `Total: $${this.total.toFixed(2)}`;

}

crearPlat(objPlato) {
  let listaPlatosElement = this.shadowRoot.querySelector("ul");

  // Creo plato (li)
  let platoElement = document.createElement("li");
  platoElement.setAttribute("id", objPlato.id);
  platoElement.textContent = `${objPlato.platoTitulo} (x${objPlato.cantidad}) - $${(objPlato.precio * objPlato.cantidad).toFixed(2)}`;

  // Crear botón para eliminar el plato
  let btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.addEventListener("click", () => {
    this.eliminarPlato(objPlato);
  });

  // Agregar el botón al elemento del plato
  let platoContainer = document.createElement("li");
  platoContainer.classList.add("plato");
  platoContainer.appendChild(platoElement);
  platoContainer.appendChild(btnEliminar);

  // Agregar el plato al carrito
  listaPlatosElement.appendChild(platoContainer);

  // Añadir el plato al objeto this.platos
  // this.platos[objPlato.id] = objPlato;
}

        eliminarPlato(objPlato) {
          let platoElement = this.shadowRoot.getElementById(objPlato.id);

          if (platoElement) {
            let quantitat = platoElement.textContent;
            let position = quantitat.indexOf(")");
            quantitat = parseInt(quantitat.substring(position - 1, position));

            if (quantitat > 1) {
              quantitat--;
              platoElement.textContent = `${objPlato.platoTitulo} (x${quantitat}) - $${(objPlato.precio * quantitat).toFixed(2)}`;
            } else {
              platoElement.remove();
              delete this.platos[objPlato.id];
            }

            this.total -= objPlato.precio;
            this.shadowRoot.querySelector("#total").innerText = `Total: $${this.total.toFixed(2)}`;

            let btnEliminar = platoElement.querySelector("button");
            if (quantitat === 1) {
              btnEliminar.style.display = "none";
            }  else {
              btnEliminar.style.display = "block";
             }
          }
        }
}
customElements.define("app-comanda", AppComanda);



