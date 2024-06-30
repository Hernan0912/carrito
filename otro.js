// const root = document.querySelector("#root")
// const div = document.createElement("div")
// const p = document.createElement("p")
// const p1 = document.createElement("p")
// const img = document.createElement("img")

// const response = fetch("./productos.json")
//     .then(function (response) {
//         return response.json();
//     }).then(function (obj) {
//         console.log("Obj: ", obj);
//         for (const item in obj) {
//             const element = obj[item];
//             console.log("Element:", element)

//             root.innerHTML += `
//                 <div class="card">
//                     <img src="${element.img}">
//                     <p>Producto: ${element.producto}</p>
//                     <p>Precio: ${element.precio}</p>
//                 </div>  `
                
//         }
//     }).catch(function (error) {
//         console.log("Ha ocurrido un error", error)
//     })

//JSON.parse convierte el JSON en un objeto, para poder modificarlo.
//JSON.stringify convierte el objeto JSON en un string, para que no sea modificado.
//JSON es un conjunto de objetos. Con un for in, creamos una variable que trae cada uno de esos objetos para luego poder acceder a sus elementos.

//---------------------------------------------------------------------------------------------------------------------

// Al usar fetch a una ruta local, el navegador arroja un error de CORS policy. Razón: pedido CORS no es http

// p.textContent="Yerba Mate"
// p1.textContent = "Precio: $ 3.000"
// img.src = "./images/Yerba.webp"
// img.classList.add("imagen")
// div.classList.add("card")

// div.appendChild(img)
// div.appendChild(p)
// div.appendChild(p1)
// root.appendChild(div)


// fetch('productos')
//     .then(function(response){
//         return response.json();
//     }).then(function(obj){
//         console.log(obj);
//     })
//     .catch(function(error){
//         console.log("Ha ocurrido un error")
//     })

// -----------------------------------------------------------------------------------------------------------------

//Consumo la API de rick and morty

// const root = document.querySelector("#root")
// const div = document.createElement("div")
// const p = document.createElement("p")
// const p1 = document.createElement("p")
// const img = document.createElement("img")

// const response = fetch("https://rickandmortyapi.com/api/character")
//     .then(function (response) {
//         return response.json();
//     }).then(function (obj) {
//         console.log("Obj: ", obj.results);
//         for (const item in obj.results) {
//             const element = obj.results[item];
//             console.log("Element:", element)

//             root.innerHTML += `
//                 <div class="card">
//                     <img src="${element.image}">
//                     <p>Name: ${element.name}</p>
//                     <p>Is hidden: ${element.is_hidden}</p>
//                     <p>Status: ${element.status}</p>
//                 </div>  `

//         }
//     }).catch(function (error) {
//         console.log("Ha ocurrido un error", error)
//     })