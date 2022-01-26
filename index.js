const apiKey = `6b2bc991445804822542c0b2bb571677`;
const hash = `74961f9a613e22d279d8d3d4215c1c7b`;

fetch(`http://gateway.marvel.com/v1/public/comics?ts=1000&apikey=${apiKey}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log(data)
            // hacerHTMLTarjetas(data.results)
    })


// inputBuscar.onkeydown = (e) => {
//     console.log(inputBuscar.value)
// }
// const busqueda = inputBuscar.value
// document.getElementById("tarjetas")
const form = document.querySelector("#form-busqueda")
const inputBusqueda = document.querySelector("#busqueda")
const seccionTarjetas = document.getElementById("div-tarjetas")
const seccionDetalle = document.querySelector("#detalle")
const tarjetas = document.querySelectorAll("#tarjetas")

const buscarComic = (busqueda) => {
    fetch(`https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${busqueda}&apikey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            hacerHTMLTarjetas(data.data.results)
        })
        // get(`https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${busqueda}&apikey=${apiKey}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //         hacerHTMLTarjetas(data.results)
        //     })
}

// const buscarComicPorId = (id) => {
//     fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}/comics?apikey=${apiKey}`)
//         .then(res => res.json())
//         .then(data => {
//             crearVistaDetalle(data)
//         })
// }


const hacerHTMLTarjetas = (data) => {
    // seccionTarjetas.style.display = "flex"
    // seccionDetalle.style.display = "none"
    seccionTarjetas.innerHTML =
        data.map((comic) => {
            let acc = ``
            return acc + `
      <article class="tarjetas" data-id="${comic.id}">
        <h2>${comic.title}</h2>
        <div>${comic.dates.description}</div>
        <img src="${comic.images}" alt="">
      </article>
    `
        })


}

// asignarClickATarjetas()
// const crearVistaDetalle = (data) => {
//     seccionTarjetas.style.display = "none"
//     seccionDetalle.style.display = "flex"

//     seccionDetalle.innerHTML = `
//     <article class="detalle-producto">
//     <h2>${data.title}</h2>
//     ${mostrarEnvioGratuito(data.shipping.free_shipping)}
//     </article>
//   `
// }

// const asignarClickATarjetas = () => {
//     const tarjetas = document.querySelectorAll(".tarjeta")
//     for (let i = 0; i < tarjetas.length; i++) {
//         tarjetas[i].onclick = () => {
//             const id = tarjetas[i].dataset.id
//             buscarComicPorId(id)
//         }
//     }
//}

// const mostrarImagenTarjeta = (img) => {
//     if (img) {
//         return `<img src="${img}"></img>`
//     } else {
//         `<img src="not-found.jpeg">`
//     }
// }


form.onsubmit = (e) => {
    e.preventDefault()
    buscarComic(inputBusqueda.value)
}