//URL//
const marvelUrl = "https://gateway.marvel.com/";
const apiKey = "423b341c7eb99f57e1ff80044ac07c00";
const hash = "1cc015d0c7a2767420a5d9c32e8d9a10";

const cardsContainer= document.getElementById("cardsContainer")
let totalPages;

const updatingResultsCount = count =>{
    const cardsSinResultados = document.getElementById("cardsSinResultados");
    cardsSinResultados.innerHTML = count + " RESULTADOS";
}

const createCards =  (response, type)=> {
    cardsContainer.innerHTML = "";
    const total = response.data.total;
    updatingResultsCount(total);
    const data = response.data.results;
    console.log(response);
    
    data.forEach((element) => {
        
        const a = document.createElement("a");
        const card = document.createElement("div");
        const img = document.createElement("img");
        const title = document.createElement("h3");
    
        a.setAttribute("href", "information.html?id=" + element.id + "&type=" + type + "&page=1");
    
        if (element.thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") {
            img.setAttribute("src","imagenotfoundhydra.jpg");
        }
        else {
            img.setAttribute("src", element.thumbnail.path + "." + element.thumbnail.extension);
        }
        const titleTxt = document.createTextNode(element.title || element.name);
            img.classList.add("card-img");
            title.classList.add("card-h3");
            card.classList.add("card");
            a.classList.add("links");
            a.appendChild(img);
            title.appendChild(titleTxt);
            a.appendChild(title);
            card.appendChild(a);
            cardsContainer.appendChild(card);
        });
};   



