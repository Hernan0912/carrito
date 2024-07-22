const root = document.querySelector("#root")
const subtotal = document.querySelector(".subtotal")
const div = document.createElement("div")
const p = document.createElement("p")
const p1 = document.createElement("p")
const img = document.createElement("img") //Tamaño de imagen 250 px
let cant = 1

const jsonData = [
    {
        "id": "0",
        "producto": "Yerba Mate",
        "img": "./images/yerba.jpg",
        "precio": 500,
        "cantidad": 1
    },
    {
        "id": "1",
        "producto": "Fideos",
        "img": "./images/fideos.jpg",
        "precio": 800,
        "cantidad": 1
    },
    {
        "id": "2",
        "producto": "Atun",
        "img": "./images/atun.jpg",
        "precio": 900,
        "cantidad": 1
    },
    {
        "id": "3",
        "producto": "Harina",
        "img": "./images/harina.png",
        "precio": 600,
        "cantidad": 1
    }
]

const prodCarrito = {
    id: "",
    producto: "",
    img: "",
    precio: "",
    cantidad:"",
}

function crearProducto(id, producto, img, precio,cantidad) {
    return {
        id: id,
        producto: producto,
        img: img,
        precio: precio,
        cantidad:cantidad,
    };

}

let carritoDeCompras = []

for (const item in jsonData) { //Tomo los datos del json
    const element = jsonData[item];
    root.innerHTML += `
        <div class="card">
            <img class="imagen" src="${element.img}">
            <p>Producto: ${element.producto}</p>
            <p>Precio: $${element.precio}</p>
            <button class="botonComprar" id="${element.id}">Comprar</button>
        </div> `
}

const contenedorCarrito = document.querySelector(".contenedorCarrito")
const botonCarrito = document.querySelector(".botonCarrito")

botonCarrito.addEventListener("click", () => { //Le doy funcionalidad al boton carrito
    if (contenedorCarrito.className.includes("esconder")) {
        contenedorCarrito.classList.remove("esconder")
    } else {
        contenedorCarrito.classList.add("esconder")
    }
})

const botonComprar = document.querySelectorAll(".botonComprar")//Capturo el boton comprar
const contadorCarrito = document.createElement("p") //Creo el contador del carrito
const contenedorContadorCarrito = document.querySelector(".contenedorContadorCarrito")//Capturo el contenedor carrito
contadorCarrito.classList.add("cantidadProductosCarrito")//Detalles esteticos
let contador = 0;//Me va a servir para el contador de productos en el carrito

botonComprar.forEach(element => {
    element.addEventListener("click", () => {
        contenedorContadorCarrito.appendChild(contadorCarrito) //Agrego el contador del carrito en el html
        carrito.innerHTML = `<p class="textoCarrito"> Productos seleccionados: </p>`
        llenarCarrito(element)
        imprimirCarrito()
        contadorCarrito.textContent = carritoDeCompras.length
    })
})

document.addEventListener("DOMContentLoaded", () => {
    carritoDeCompras = JSON.parse(localStorage.getItem("carritoDeCompras")) || []

    if(carritoDeCompras.length == 0){
        carrito.innerHTML = `<p class="textoCarrito"> No tienes productos seleccionados</p>`
    }else{
        carrito.innerHTML += `<p class="textoCarrito"> Productos seleccionados: </p>`
        imprimirCarrito()
        contenedorContadorCarrito.appendChild(contadorCarrito)
        contadorCarrito.textContent = carritoDeCompras.length
    }
})

function imprimirCarrito() {
    for (const key in carritoDeCompras) { //for in para recorrer los objetos del carritoDeCompras
        const compra = carritoDeCompras[key]
        mostrar(compra)
    }
    calcularSubtotal()
    botonSuma()
    botonResta()
    total()
    eliminar()
    localStorage.setItem("carritoDeCompras",JSON.stringify(carritoDeCompras))
}

function eliminar(){
    const botonEliminar = document.querySelectorAll(".botonEliminar")
    botonEliminar.forEach(borrar => {
        borrar.addEventListener("click", () => {
            eliminarElementoCarrito(borrar)
        })
    })
}

function mostrar(compra){
    carrito.innerHTML += `
    <div class="cardCarrito">
        <div>
            <img class="imagenCarrito" src="${compra.img}">
        </div>
        <div>
            <div class="productoPrecio">
                <p>${compra.producto}</p>
                <p>$${compra.precio}</p>
            </div>
            <div class="cantidadProducto">
                <div class="contenedorUnidades">
                    <p>Cantidad:</p>
                    <button class="botonUp">+</button>
                    <input id="input" class="cantidadUnidades" type="number" value="${compra.cantidad}" min="1" max="10">
                    <button class="botonDown">-</button>
                </div>
            </div>
            <button class="botonEliminar" id="${compra.id}">X Eliminar</button>
        </div>
    </div>`
}

function llenarCarrito(element) {
    for (const i in jsonData) {
        const compra = jsonData[i]
        if (compra.id == element.id) {  
            if(!yaExisteProducto(element)){
                carritoDeCompras.push(crearProducto(compra.id, compra.producto, compra.img, compra.precio,compra.cantidad));
            }
        }
    }
}

function yaExisteProducto(element) {
    for (const x in carritoDeCompras) {
        const data = carritoDeCompras[x];
        if(data.id == element.id){
            return true
        }
    }
}

function eliminarElementoCarrito(borrar) {
    for (const i in jsonData) {
        const compra = jsonData[i]
        if (compra.id == borrar.id) {
            carritoDeCompras = carritoDeCompras.filter(item => item.id !== borrar.id);
            carrito.innerHTML = ``
            carrito.innerHTML = `<p class="textoCarrito"> Productos seleccionados: </p>`
            imprimirCarrito()
            if(carritoDeCompras.length > 0){
                contadorCarrito.textContent = carritoDeCompras.length
            }else{
                carrito.innerHTML = `<p class="textoCarrito">No tienes productos seleccionados</p>`
                contenedorContadorCarrito.removeChild(contadorCarrito)
            }
        }
    }
}

function calcularSubtotal(){
    let subtotalProd = 0
    for (const valorUnidad in carritoDeCompras) {
        const subtotal = carritoDeCompras[valorUnidad]
        if(yaExisteProducto(subtotal)){
            subtotalProd += subtotal.precio
        }
    }
    if(carritoDeCompras.length == 0){
        subtotalProd = 0
    }
     carrito.innerHTML+=`
     <div class="totales">
         <p>Total a pagar: $${subtotalProd}</p>
     </div> `
}

function botonSuma() {
    const botonUp = document.querySelectorAll(".botonUp")
    botonUp.forEach(up => {
        up.addEventListener("click", (event) => {
            let input = event.target.closest(".contenedorUnidades").querySelector(".cantidadUnidades") //Capturo el nodo del input
            let cant = Number(input.value)
            if (cant > 0 && cant < 10) {
                cant++
                input.value = cant  // Actualizo el valor del input
            }
        })
    })
}

function botonResta() {
    const botonDown = document.querySelectorAll(".botonDown")
    botonDown.forEach(down => {
        down.addEventListener("click", (event) => {
            let input = event.target.closest(".contenedorUnidades").querySelector(".cantidadUnidades") //Capturo el nodo del input
            let cant = input.value
            if (cant > 1) {
                cant--
                input.value = cant  // Actualizo el valor del input
            }
        })
    })
}

function total() {
    let calculo
    const botonSumarCant = document.querySelectorAll(".botonUp")
    botonSumarCant.forEach(element => {
        element.addEventListener("click",(e)=>{
            const puntero = e.target
            const idNumero = puntero.parentElement.parentElement.nextElementSibling.id
            const coeficiente = Number(puntero.nextElementSibling.value)
            const precio = Number(puntero.parentElement.parentElement.previousElementSibling.lastElementChild.textContent)
            for (const valorUnidad in carritoDeCompras) {
                if(idNumero == carritoDeCompras[valorUnidad].id){
                    if(carritoDeCompras[valorUnidad].cantidad<10){
                        carritoDeCompras[valorUnidad].cantidad++
                    }
                    for (const key in jsonData) {
                        if(idNumero == jsonData[key].id){
                            calculo = coeficiente*jsonData[key].precio
                            carritoDeCompras[valorUnidad].precio = calculo
                            carrito.innerHTML = `<p class="textoCarrito">Productos seleccionados: </p>`
                            imprimirCarrito()
                        }
                    }
                }
            }
        })
    })

    const botonRestarCant = document.querySelectorAll(".botonDown")
    botonRestarCant.forEach(elemento => {
        elemento.addEventListener("click",(e)=>{
            const pointer = e.target
            const idNumero = pointer.parentElement.parentElement.nextElementSibling.id
            const coeficient = Number(pointer.previousElementSibling.value)
            const price = Number(pointer.parentElement.parentElement.previousElementSibling.lastElementChild.textContent)
            for (const valorUnidad in carritoDeCompras) {
                if(idNumero == carritoDeCompras[valorUnidad].id){
                    if(carritoDeCompras[valorUnidad].cantidad>1){
                        carritoDeCompras[valorUnidad].cantidad--
                    }
                    for (const key in jsonData) {
                        if(idNumero == jsonData[key].id){
                            calculo = coeficient*jsonData[key].precio
                            carritoDeCompras[valorUnidad].precio = calculo
                            carrito.innerHTML = `<p class="textoCarrito">Productos seleccionados: </p>`
                            imprimirCarrito()
                        }
                    }
                }
            }
        })
    }) 
}