fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${apiKey}&hash=${hash}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log(data)
    })
const apiKey = "6b2bc991445804822542c0b2bb571677";
const hash = "74961f9a613e22d279d8d3d4215c1c7b"

// inputBuscar.onkeydown = (e) => {
//     console.log(inputBuscar.value)
// }
// const busqueda = inputBuscar.value

const form = document.querySelector("#form-busqueda")
const inputBusqueda = document.querySelector("#busqueda")
const seccionTarjetas = document.querySelector("#tarjetas")
const seccionDetalle = document.querySelector("#detalle")

const buscarProductos = (busqueda) => {


    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${busqueda}`)
        .then(res => res.json())
        .then(data => {
            hacerHTMLTarjetas(data.results)
        })
}

const buscarProducto = (id) => {
    fetch(`https://api.mercadolibre.com/items/${id}`)
        .then(res => res.json())
        .then(data => {
            crearVistaDetalle(data)
        })
}



const crearVistaDetalle = (data) => {
    seccionTarjetas.style.display = "none"
    seccionDetalle.style.display = "flex"

    seccionDetalle.innerHTML = `
    <article class="detalle-producto">
    <h2>${data.title}</h2>
    ${mostrarEnvioGratuito(data.shipping.free_shipping)}
    </article>
  `
}

const asignarClickATarjetas = () => {
    const tarjetas = document.querySelectorAll(".tarjeta")
    for (let i = 0; i < tarjetas.length; i++) {
        tarjetas[i].onclick = () => {
            const id = tarjetas[i].dataset.id
            buscarProducto(id)
        }
    }
}

const mostrarImagenTarjeta = img => {
    if (img) {
        return `<img src="${img}"></img>`
    } else {
        `<img src="not-found.jpeg">`
    }
}

const hacerHTMLTarjetas = productos => {
    seccionTarjetas.style.display = "flex"
    seccionDetalle.style.display = "none"
    seccionTarjetas.innerHTML = productos.reduce((acc, curr) => {
        return acc + `
      <article class="tarjeta" data-id="${curr.id}">
        <h2>${curr.title}</h2>
        <p>${curr.price}</p>
        ${mostrarImagenTarjeta(curr.thumbnail)}
      </article>
    `
    }, "")

    asignarClickATarjetas()
}

form.onsubmit = (e) => {
    e.preventDefault()
    buscarProductos(inputBusqueda.value)
}