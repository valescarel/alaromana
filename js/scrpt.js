
menuDisponible = [
    "hamburguesa",
    "papas",
    "bebida"
]

let nombreIngresado   = prompt("Hola, cómo te llamas?");

function cargarProducto () {
    if((nombreIngresado !="")) {
        let elegirComida = prompt(`${nombreIngresado} , qué querés comer hoy?`); 
            if (menuDisponible.includes (elegirComida)){
                alert ("El producto ha sido agregado")
            } else {
                alert ("El producto no esta disponible, intente de nuevo.")
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
        alert ("pedido completado")
    }
}