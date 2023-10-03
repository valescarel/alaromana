
class Plato {
    constructor(nombre, cantidad) {
        // PROPIEDADES O ATRIBUTOS
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

    mostrarDatos() {
        return `Plato: ${this.nombre}`;
    }
}

let pedido = new Plato ("Hamburguesa", "2");
pedido.mostrarDatos();

let pedidoCompleto = [];

function guardarPedido(e) {
    e.preventDefault();
    let nombre = document.querySelector("#plato").value;
    let cantidad = document.querySelector("#cantidad").value;

    let pedidoListo = new Plato(nombre, cantidad);
    pedidoCompleto.push(pedidoListo);

    mostrarListado(pedidoCompleto);
    

    document.getElementById("formularioComida").reset();
}

function agregarAlCarrito(elemento) {
    console.log(elemento);
    console.log(`Se agregó ${elemento.cantidad} ${elemento.nombre} al carrito`);
}

function mostrarListado(pedidoCompleto) {
    let listado = document.getElementById("listado");

    listado.textContent = "";


    pedidoCompleto.forEach((elemento) => {

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");

        
        const plato = document.createElement("h3");
        plato.textContent = `Pediste: ${elemento.nombre}`;

        tarjeta.appendChild(plato);

        const cantidad = document.createElement("div");
        cantidad.textContent = `Porciones: ${elemento.cantidad}`;
        tarjeta.appendChild(cantidad);

        const boton = document.createElement("input");
        boton.type = "button";

        boton.id = `${elemento.cantidad$} ${elemento.nombre}`;
        boton.value = "Agregar al carrito";

        boton.addEventListener("click", () => agregarAlCarrito(elemento));

        tarjeta.appendChild(boton);

        listado.appendChild(tarjeta);
    });
}

function cambiarTema() {
    document.body.classList.toggle("darkMode");
}

function mostrarFormulario() {
    let menuOculto = document.getElementById("agregarProductos");
    menuOculto.classList.toggle("oculto");
}

let botonDarkMode = document.getElementById("darkMode");
botonDarkMode.addEventListener("click", cambiarTema);

let mostrarMenu = document.getElementById("mostrarMenu");
mostrarMenu.addEventListener("click", mostrarFormulario);

let formulario = document.getElementById("formularioComida");
formulario.addEventListener("submit", guardarPedido);
