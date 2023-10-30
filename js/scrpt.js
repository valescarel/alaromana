let carrito = [];
let carro = document.getElementById("carrito");
let divComida = document.getElementById("divComidas");
let inputBuscador = inputTexto.value;
let selectComida = document.getElementById('select-comida')
let botonSimple = document.getElementById('hamburguesa-simple')
let botonDoble = document.getElementById('hamburguesa-doble')
let botonOtras = document.getElementById('hamburguesa-otras')
let botonSelect = document.getElementById('select-button')
let botonVaciar = document.getElementById("vaciar-carrito")
let divTotal = document.getElementById('total-carrito')
divTotal.textContent = `Total: 0`


//BUSCADOR
const buscador = () => {
    let inputTexto = document.getElementById("inputTexto");
    inputTexto.addEventListener("change", () => {
        let buscador = inputTexto.value;
        fetch('json/productos.json')
            .then(response => response.json())
            .then(comida => {
                let comidaFiltrados = comida.filter((comida) =>
                comida.tipo.includes(buscador.toUpperCase())
                );
                divComida.innerHTML = "";
                comidaFiltrados.forEach((comida) => {
                    const divComidaTarjeta = document.createElement("div");
                    divComidaTarjeta.classList.add("card");
                    divComidaTarjeta.style.width = "18rem";

                    let {
                        id,
                        nombre,
                        tipo,
                        precio,
                        descripcion
                    } = comida

                    const divComidaContent = `
            <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">${tipo}</p>
            <p class="card-text">${descripcion}</p>
            <p class="card-text">$ ${precio} </p>
            <button id="boton${id}" class="btn btn-primary agregar-carrito"> Agregar al carrito</button>
            </div>
            `;

                    divComidaTarjeta.innerHTML = divComidaContent;
                    divComidaTarjeta
                        .querySelector(".agregar-carrito")
                        .addEventListener("click", () => agregarCarrito(comida));
                    divComida.append(divComidaTarjeta);
                });
            })
    });
};

const pintarConBoton = (boton) => {
    boton.addEventListener('click', () => {
        fetch('json/productos.json')
            .then(response => response.json())
            .then(comida => {
                let comidaFiltrados = comida.filter((comida) =>
                comida.tipo.includes(boton.value)
                );
                divComida.innerHTML = "";
                comidaFiltrados.forEach((comida) => {
                    const divComidaTarjeta = document.createElement("div");
                    divComidaTarjeta.classList.add("card");
                    divComidaTarjeta.style.width = "18rem";

                    let {
                        id,
                        nombre,
                        tipo,
                        precio,
                        descripcion
                    } = comida

                    const divComidaContent = `
            <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">${tipo}</p>
            <p class="card-text">${descripcion}</p>
            <p class="card-text">$ ${precio}</p>
            <button id="boton${id}" class="btn btn-primary agregar-carrito"> Agregar al carrito</button>
            </div>
            `;

                    divComidaTarjeta.innerHTML = divComidaContent;
                    divComidaTarjeta
                        .querySelector(".agregar-carrito")
                        .addEventListener("click", () => agregarCarrito(comida));
                    divComida.append(divComidaTarjeta);
                });
            })
    })
}
//FUNCION PARA MOSTAR CON LOS BOTONES
const mostrarConBoton = () => {
    pintarConBoton(botonSimple)
    pintarConBoton(botonDoble)
    pintarConBoton(botonOtras)
}

//FUNCION AGREGAR AL CARRITO
const agregarCarrito = (comida) => {
    const divComidaTarjeta = document.createElement("div");
    if (carrito.includes(comida)) {
        Swal.fire({
            title: 'Ya esta en tu carrito!',
            text: 'Continuar con tu compra',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        })
    } else {
        Toastify({
            text: "Agregado correctamente",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            className: "added",
            style: {
                background: "linear-gradient(to right, #dcff03, #ede700, #f8ce00, #feb500, #ff9d0a)",
            },
            onClick: function () {}
        }).showToast();

        divComidaTarjeta.setAttribute("id", "comida-card");
        divComidaTarjeta.classList.add("card");
        divComidaTarjeta.style.width = "18rem";

        let {
            id,
            nombre,
            precio,
        } = comida

        const divComidaTarjetaContent = `
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text"><i class="fa-brands fa-ethereum"></i>$ ${precio}</p>
                <a id="eliminar-${id}" class="btn-eliminar"><i class="fa-solid fa-trash-can"></i></a>
            </div>`;

        divComidaTarjeta.innerHTML = divComidaTarjetaContent;
        divComidaTarjeta
            .querySelector(".btn-eliminar")
            .addEventListener("click", (e) => eliminarComidaDelCarrito(comida, e));
        carro.append(divComidaTarjeta);
        carrito = [...carrito, comida]
    }

    //TOTAL CARRITO
    if (carrito.length > 0) {
        let totalCarrito = carrito.reduce(
            (acc, ite) => acc + ite.precio,
            0
        );
        divTotal.textContent = `Total: ${totalCarrito}`;
    }

    localStorage.setItem("ComidasAgregadas", JSON.stringify(carrito));

}

//FUNCION ELIMINAR DEL CARRITO
const eliminarComidaDelCarrito = (comida, e) => {
    let comidaTarjeta = e.target.closest("#comida-card");
    for (let c = 0; c < carrito.length; c++) {
        (carrito[c] === comida) &&
        carrito.splice(c, 1);
        localStorage.setItem("ComidasAgregadas", JSON.stringify(carrito))
        comidaTarjeta.remove();
        let totalCarrito = carrito.reduce(
            (acc, ite) => acc + ite.precio,
            0
        );

        divTotal.textContent = `Total: ${totalCarrito}`;

    }
    console.log(carrito);
    console.log(carrito.length);
};

//FUNCION VACIAR CARRITO
const vaciarCarrito = () => {
    botonVaciar.addEventListener('click', () => {
        carro.innerHTML = ""
        carrito.splice(0, carrito.length);
        divTotal.textContent = `Total: 0`;
        localStorage.setItem("ComidasAgregadas", "")
        console.log(carrito.length)
    })
}

//FUNCION CONFIRMAR COMPRA
const confirmarCompra = () => {
    let botonComprar = document.getElementById('confirmar-compra')
    botonComprar.addEventListener('click', (e) => {
        e.preventDefault();
        if (carrito.length == 0) {
            Swal.fire({
                title: 'No hay nada que comprar!',
                text: 'Vuelve a buscar',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            })
        } else {
            setTimeout(() => location.href = "../compra.html", 1000);
        }
    })
}


buscador();
mostrarConBoton();
vaciarCarrito();
confirmarCompra();
