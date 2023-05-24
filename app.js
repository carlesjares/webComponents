const platos = [
    {
        id: 1,
        titulo: "Canelones",
        precio: 7.99,
        descripcion: "Canelones caseros rellenos de carne",
        img: "./img/canelones.png",
        tipo:"primero",
    },
    {
        id: 2,
        titulo: "Macarrones",
        precio: 6.99,
        descripcion: "Macarrones con salsa boloñesa",
        img: "./img/macarrones.png",
        tipo:"primero",
    },
    {
        id: 3,
        titulo: "Espaguetis",
        precio: 6.5,
        descripcion: "Espaguetis a la boloñesa",
        img: "./img/espaguetis.png",
        tipo:"primero",
    },
    {
        id: 4,
        titulo: "Ensalada",
        precio: 4.99,
        descripcion: "Ensalada de la casa buenisima",
        img: "./img/ensalada.png",
        tipo:"primero",
    },
    {
        id: 5,
        titulo: "Agua",
        precio: 2,
        descripcion: "Agua bezoya",
        img: "./img/agua.png",
        tipo:"bebida",
    }, 
    {
        id: 6,
        titulo: "Coca Cola",
        precio: 3,
        descripcion: "Coca cola fresca",
        img: "./img/coca-cola.png",
        tipo:"bebida",
    },
    {
        id: 7,
        titulo: "Bistec",
        precio: 9,
        descripcion: "Bistec de vaca gallega 46 dias de maduracion",
        img: "./img/bistec.png",
        tipo:"segundo",
    }

]

document.addEventListener("DOMContentLoaded", mostrarComponente);


function mostrarComponente() {
    const app = document.querySelector("#app");

    platos.forEach((plato) => {
        const pedidoInfo = document.createElement('app-producto');
        pedidoInfo.setAttribute("producto-id", plato.id);
        pedidoInfo.setAttribute("producto-titulo", plato.titulo);
        pedidoInfo.setAttribute("producto-precio", plato.precio);
        pedidoInfo.setAttribute("producto-descripcion", plato.descripcion);
        pedidoInfo.setAttribute("producto-img", plato.img);
        pedidoInfo.setAttribute("producto-tipo", plato.tipo);
        app.appendChild(pedidoInfo);
        
            
    });  

      
}


