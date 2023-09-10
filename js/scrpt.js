// let ingreseNombre = (prompt ("Hola!, Cómo te llamás?"))
// if (ingreseNombre = null) {
//     alert ('por favor ingrese su nombre')
// } else {
//     alert ('${ingreseNombre}, que queres comer hoy?')
// }
const hamburguesa = {
    nombre: "Hamburguesa simple con papas",
    precio: 3000
}
const papas = {
    nombre: "Papas fritas con cheddar",
    precio: 2300
}
const bebida = {
    nombre: "Gaseosa linea coca-cola",
    precio: 750
}

const productos = 
[
    "hamburguesa",
    "papas",
    "bebida"
]

let nombreIngresado   = prompt("Hola, cómo te llamas?");

function cargarProducto () {
    if((nombreIngresado !="")) {
        let elegirComida = prompt(`${nombreIngresado} , qué querés comer hoy?`); 
            if (productos.includes (elegirComida)){
                alert ("El producto ha sido agregado")
            } else {
                alert ("El producto no existe, intente de nuevo.")
            }
    } else {
        alert("Por favor ingresa tu nombre!");
    }
}

let flag = true

while (flag) {
    cargarProducto()
    flag = confirm("¿Quieres seguir agregando productos?")
    if (!flag) {
        mostrarTotal()
    }
}


function mostrarTotal() {
    for (const producto of productos){
        producto.precio = producto.precio
        console.log(producto)
    }
}

