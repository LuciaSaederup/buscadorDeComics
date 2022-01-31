
const paginadoComic = document.querySelector("#controles")
const paginadoPersonaje = document.querySelector("#controles-personaje")






const apiKey = `6b2bc991445804822542c0b2bb571677`;
const hash = `74961f9a613e22d279d8d3d4215c1c7b`;


fetch(`http://gateway.marvel.com/v1/public/comics?ts=1000&apikey=${apiKey}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        hacerHTMLTarjetas(data.data.results)
    })



// "scss": "node-sass --watch style/scss -o style/css"


// open api  key marvel:93c0e369ba23b10fe80edb027c368e12

fetch (`https://gateway.marvel.com/v1/public/comics?ts=1&apikey=93c0e369ba23b10fe80edb027c368e12`)
.then (res=> res.json())
.then(data => console.log(data))

let comicGlobal = 0



const listaComics = () => {
fetch (`https://gateway.marvel.com:443/v1/public/comics?offset=${comicGlobal}&apikey=93c0e369ba23b10fe80edb027c368e12`)
.then((res) => res.json())
.then((data) => {
    console.log(data.data.results)
    paginadoPersonaje.style.display = "none"
    paginadoComic.style.display = "block"
  crearTarjetasComics(data.data.results)
     })
 }

 listaComics()

 const crearTarjetasComics = (data) => {
    const personajes = document.querySelector("#personajes")
    const html = data.reduce((acc, curr) => {
         return acc + `
         <article class="personaje">
         <h2>${curr.title}</h2>
         <img src="${curr.thumbnail.path}.${curr.thumbnail.extension}">
         </article>`
         }, "")
    personajes.innerHTML = html
 }
  



const prev = document.querySelector("#prev")
const next = document.querySelector("#next")


if (comicGlobal === 0) {
    prev.disabled = true
}


 next.onclick = () => {
     
    comicGlobal += 20
    listaComics()
    prev.disabled = false
    
 }

 prev.onclick = () => {
  
    if (comicGlobal === 20) {
        prev.disabled = true
    }

   
    comicGlobal -= 20
    listaComics()
  
 }




 
personajesASaltar = 0


 
 const listaPersonajes = () => {
    fetch (`https://gateway.marvel.com:443/v1/public/characters?offset=${personajesASaltar}&apikey=93c0e369ba23b10fe80edb027c368e12`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data.data.results)
        paginadoComic.style.display = "none"
        paginadoPersonaje.style.display = "block"
      crearTarjetasPersonaje(data.data.results)
         })
     }
    
     listaComics()

     const crearTarjetasPersonaje = (data) => {
        const personajes = document.querySelector("#personajes")
        const html = data.reduce((acc, curr) => {
             return acc + `
             <article class="personaje">
             <h2>${curr.name}</h2>
             <img src="${curr.thumbnail.path}.${curr.thumbnail.extension}">
             </article>`
             }, "")
        personajes.innerHTML = html
     }
     
     const selectFiltro = document.querySelector("#filtro-tipo")
     const botonBuscar = document.querySelector("#boton-buscar")

     botonBuscar.onclick = (e) => {
        e.preventDefault()

        if (selectFiltro.value === "comic"){
            listaComics ()

        }
        
        else if (selectFiltro.value === "personaje"){
            listaPersonajes ()

        }
     }
     
       
     
     const prevPersonaje = document.querySelector("#prev-personaje")
     const nextPersonaje = document.querySelector("#next-personaje")
     
     
     if (personajesASaltar === 0) {
         prev.disabled = true
     }
     
     
      nextPersonaje.onclick = () => {
          
        personajesASaltar += 20
         listaPersonajes()
         prev.disabled = false
         
      }
     
      prevPersonaje.onclick = () => {
       
         if (personajesASaltar === 20) {
             prev.disabled = true
         }
     
        
         personajesASaltar -= 20
         listaPersonajes()
       
      }
     
     



const form = document.querySelector("#form-busqueda")
const inputBusqueda = document.querySelector("#busqueda")
const seccionTarjetas = document.getElementById("div-tarjetas")
const seccionDetalle = document.querySelector("#detalle")
const tarjetas = document.querySelectorAll("#tarjetas")

const buscarComic = (busqueda) => {
    fetch(`https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${busqueda}&apikey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            hacerHTMLTarjetas(data.data.results)

        })

}




const hacerHTMLTarjetas = (data) => {
    const htmlAimprimir = data.reduce((acc, comic) => {
        return acc + `<div class="tarjetas" data-id="${comic.id}" style="background-image: url(${comic.thumbnail.path}.${comic.thumbnail.extension})">

        <h2 class="titulo-tarjeta">${comic.title}</h2>
        
        
      </div>`
    }, "")
    seccionTarjetas.innerHTML = htmlAimprimir
}


const todasLasTarjetas = document.querySelectorAll(".tarjetas")
console.log(todasLasTarjetas)





form.onsubmit = (e) => {
    e.preventDefault()
    buscarComic(inputBusqueda.value)
}

