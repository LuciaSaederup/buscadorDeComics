const paginadoComic = document.querySelector("#controles")
const paginadoPersonaje = document.querySelector("#controles-personaje")
const prev = document.querySelector("#prev")
const next = document.querySelector("#next")
const selectFiltro = document.querySelector("#filtro-tipo")
const selectFiltroOrden = document.querySelector("#filtro-orden")
const botonBuscar = document.querySelector("#boton-buscar")



const form = document.querySelector("#form-busqueda")
const inputBusqueda = document.querySelector("#busqueda")
const seccionTarjetas = document.getElementById("div-tarjetas")
const seccionDetalle = document.querySelector("#detalle")
const tarjetas = document.querySelectorAll("#tarjetas")

const apiKey = `6b2bc991445804822542c0b2bb571677`;
const hash = `74961f9a613e22d279d8d3d4215c1c7b`;

fetch("http(s)://gateway.marvel.com/")
    .then((res) => {

        return res.json()
    })
    .then((data) => {
        console.log(data)

    })

    fetch (`https://gateway.marvel.com/v1/public/comics?ts=1&apikey=6b2bc991445804822542c0b2bb571677`)
    .then (res=> res.json())
    .then(data => console.log(data))
    
    let comicGlobal = 0


    const listaComics = () => {
    console.log(busqueda)
    
    fetch(`https://gateway.marvel.com:443/v1/public/comics?${busqueda}orderBy=${globalOrdenBy}&offset=${comicGlobal}&apikey=6b2bc991445804822542c0b2bb571677`)
    
    .then((res) => res.json())
    .then((data) => {
    console.log(data.data.results)
         paginadoPersonaje.style.display = "none"
         paginadoComic.style.display = "block"
         hacerHTMLTarjetas(data.data.results)
       })
    }

    listaComics()

const hacerHTMLTarjetas = (data) => {
let htmlAimprimir = data.reduce((acc, comic) => {
        return acc + `<div class="tarjetas" data-id="${comic.id}" style="background-image: url(${comic.thumbnail.path}.${comic.thumbnail.extension})">

        <h2 class="titulo-tarjeta">${comic.title}</h2>
        
        
      </div>`
    }, "")

    if(data.length == 0){
        htmlAimprimir = "No se encuentran resultados"
  
       }
     seccionTarjetas.innerHTML = htmlAimprimir
  }

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









 const listaPersonajes = () => {
    fetch (`https://gateway.marvel.com:443/v1/public/characters?${busqueda}orderBy=${globalOrdenBy}&offset=${personajesASaltar}&apikey=6b2bc991445804822542c0b2bb571677`)
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
        console.log(data.length)
     let  htmlAimprimir = data.reduce((acc, curr) => {
      return acc + `<div class="tarjetas" data-id="${curr.id}" style="background-image: url(${curr.thumbnail.path}.${curr.thumbnail.extension})">
       
      <h2 class="titulo-tarjeta">${curr.name}</h2>  
             </div>`
           }, "")
        if(data.length == 0){
         htmlAimprimir = "No se encuentran resultados"

        } 
        seccionTarjetas.innerHTML = htmlAimprimir
     }
     
