const apiKey = `6b2bc991445804822542c0b2bb571677`;
const hash = `74961f9a613e22d279d8d3d4215c1c7b`;

fetch(`http://gateway.marvel.com/v1/public/comics?ts=1000&apikey=${apiKey}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        hacerHTMLTarjetas(data.data.results)
    })



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