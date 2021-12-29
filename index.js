// fetch("http(s)://gateway.marvel.com/")
//     .then((res) => {

//         return res.json()
//     })
//     .then((data) => {
//         console.log(data)

//     })

const inputBuscar = document.getElementById('input-buscador');

inputBuscar.onkeydown = (e) => {
    console.log(inputBuscar.value)
}
const busqueda = inputBuscar.value

//  const buscarComics = (busqueda) => {
//      fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${busqueda}`)
//          .then(res => res.json())
//          .then(data => {
//             hacerHTMLTarjetas(data.results)
//          })
//  }