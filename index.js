//URL//
const marvelUrl = "https://gateway.marvel.com/v1/public/";
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

const getComics= async (developerPass) => {
    let data = [];
    try {
        const response = await fetch(`${marvelUrl}comics${developerPass}`);
        data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
        return data;
    }
};

const getCharacters = async (developerPass) => {
    let data = [];
    try {
        const response = await fetch(`${marvelUrl}characters${developerPass}`);
        data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
        return data;
    }
};

const getPages = async (required) => {
    let totalPages = 0;
    try{
        const response = await required;
        const limit = response.data.limit;
        const total = response.data.total;
        totalPages = total / limit;
        if(totalPages%1 !== 0){
            totalPages = Math.ceil(totalPages);
        }
        return totalPages;
    }
    catch(error){
        console.log(error);
        return totalPages;
    }
}

const disableButtons = async (required) => {
    const developerPass = new URLSearchParams(window.location.search);
    try {
        
        if (parseInt(developerPass.get("page")) === 1) {

            previousPage.classList.remove('enabledButton');
            previousPage.classList.add('disabledButton');
            previousPage.disabled = true;
            firstPage.classList.remove('enabledButton');
            firstPage.classList.add('disabledButton');
            firstPage.disabled = true;
        }
        else {

            previousPage.classList.add('enabledButton');
            previousPage.classList.remove('disabledButton');
            previousPage.disabled = false;
            firstPage.classList.add('enabledButton');
            firstPage.classList.remove('disabledButton');
            firstPage.disabled = false;
        }
        
        totalPages = await getPages(required);

        if (parseInt(developerPass.get("page")) === totalPages) {

            nextPage.classList.remove('enabledButton');
            nextPage.classList.add('disabledButton');
            nextPage.disabled = true;
            lastPage.classList.remove('enabledButton');
            lastPage.classList.add('disabledButton');
            lastPage.disabled = true;
        }
        else {

            nextPage.classList.add('enabledButton');
            nextPage.classList.remove('disabledButton');
            nextPage.disabled = false;
            lastPage.classList.add('enabledButton');
            lastPage.classList.remove('disabledButton');
            lastPage.disabled = false;
        }
    }
    catch (error) {
        console.log(error);
    }
};


const previousPage = document.getElementById("previousPage");
const nextPage = document.getElementById("nextPage");
const firstPage = document.getElementById("firstPage");
const lastPage = document.getElementById("lastPage");

nextPage.addEventListener("click",  () =>{
    const developerPass = new URLSearchParams(window.location.search);
    const page = parseInt(developerPass.get("page")) + 1;
    const offset = (page - 1) * 20;
    developerPass.set("offset", offset.toString());
    developerPass.set("page", page.toString());
    window.location.href = window.location.pathname + "?" + developerPass.toString();
});

previousPage.addEventListener("click", () => {
    const developerPass = new URLSearchParams(window.location.search);
    const page = parseInt(developerPass.get("page")) - 1;
    const offset = (page - 1) * 20;
    developerPass.set("offset", offset.toString());
    developerPass.set("page", page.toString());
    window.location.href = window.location.pathname + "?" + developerPass.toString();
});

firstPage.addEventListener("click", () =>{
    const developerPass = new URLSearchParams(window.location.search);
    developerPass.set("offset", "0");
    developerPasss.set("page", "1");
    window.location.href = window.location.pathname + "?" + developerPass.toString();
});

lastPage.addEventListener("click", () =>{
    return awaiter(this, void 0, void 0, () => {
        let developerPass, page, offset;
        return generator(this, (_a) => {
            developerPass = new URLSearchParams(window.location.search);
            page = totalPages;
            offset = (page - 1) * 20;
            developerPass.set("offset", offset.toString());
            developerPass.set("page", page.toString());
            window.location.href = window.location.pathname + "?" + developerPass.toString();
            return [2];
        });
    });
});

const cardsResultados = document.getElementById('cardsResultados');
const cardInfo = document.getElementById('card-info');
const paginas = document.getElementById('paginas');

const convertDateFormat = (date) => {
    return new Intl.DateTimeFormat('es-AR').format(new Date(date))
}


const createCharacterInfo = (element) => {
    cardInfo.innerHTML = "";
    const img = document.createElement("img");
    const info = document.createElement("div");
    const name = document.createElement("h2");
    const description = document.createElement("p");
    img.setAttribute("src", element.thumbnail.path + "." + element.thumbnail.extension);
    img.classList.add("card-info-img");
    name.classList.add("card-info-name");
    const nameTxt = document.createTextNode(element.name);
    const descriptionTxt = document.createTextNode(element.description);
    name.appendChild(nameTxt);
    description.appendChild(descriptionTxt);
    cardInfo.appendChild(img);
    info.appendChild(name);
    info.appendChild(description);
    cardInfo.appendChild(info);
};


const createComicInfo = (element) => {
    cardInfo.innerHTML = "";
    const img = document.createElement("img");
    const info = document.createElement("div");
    const title = document.createElement("h2");
    const publishedTitle = document.createElement("h3");
    const writerTitle = document.createElement("h3");
    const descriptionTitle = document.createElement("h3");
    const published = document.createElement("p");
    const writer = document.createElement("p");
    const description = document.createElement("p");
    img.setAttribute("src", element.thumbnail.path + "." + element.thumbnail.extension);
    img.classList.add("card-info-img");
    publishedTitle.classList.add("card-info-title");
    title.classList.add("card-info-title");
    writerTitle.classList.add("card-info-title");
    descriptionTitle.classList.add("card-info-title");
    published.classList.add("card-info-p");
    writer.classList.add("card-info-p");
    description.classList.add("card-info-p");
    const titleTxt = document.createTextNode(element.title);
    title.appendChild(titleTxt);
    cardInfo.appendChild(img);
    info.appendChild(title);

    
    const publishedTitleTxt = document.createTextNode("Published:");
    publishedTitle.appendChild(publishedTitleTxt);
    info.appendChild(publishedTitle);

    const dateData = element.dates.map( (element) => {
        const releaseDate = "";
        if (element.type === 'onsaleDate') {
            return convertDateFormat(element.date);
        }
    }).join('');

    const publishedTxt = document.createTextNode(dateData);
    published.appendChild(publishedTxt);
    info.appendChild(published);
    
   const writerTitleTxt = document.createTextNode("Writers:");
    writerTitle.appendChild(writerTitleTxt);
    info.appendChild(writerTitle);
    const formatName = (items) =>{
        const writer = "";
        if (items.role === 'writer') {
            writer = items.name;
        }
        return writer;
    };
    const writerData = element.creators.items.map(formatName).join("");
    const writerTxt = document.createTextNode(writerData);
    writer.appendChild(writerTxt);
    info.appendChild(writer);
    
    const descriptionTitleTxt = document.createTextNode("Description:");
    descriptionTitle.appendChild(descriptionTitleTxt);
    info.appendChild(descriptionTitle);
    const descriptionTxt = document.createTextNode(element.description || "");
    description.appendChild(descriptionTxt);
    info.appendChild(description);
    cardInfo.appendChild(info);
    updatingCountResults(0);
};
const cardsRelated = (response, type) =>{
    cardsContainer.innerHTML = "";
    if (response.data.total === 0) {
        const notResults = document.createElement('h2');
        const txtNotResults = document.createTextNode('Sin Resultados');
        notResults.appendChild(txtNotResults);
        cardsContainer.appendChild(notResults);
        paginas.classList.add('d-none');
    }
    else {
        paginas.classList.remove('d-none');
        if (type === "comics") {
            createCards(response, "characters");
        }
        else {
            createCards(response, "comics");
        }
    }
};

const createCardInfo = async () => {
    let cardsResponse = [];
    const developerPass = new URLSearchParams(window.location.search);
    let offset = developerPass.get("offset");
    let inDeveloperPass = `?ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`;
    try {
        if (developerPass.get("type") === "comics") {
            const methodComicId = `/${developerPass.get("id")}${inDeveloperPass}`;
            const methodComicIdCharacters = `/${developerPass.get("id")}/characters${inDeveloperPass}`;
            const comicResponse = await getComics(methodComicId);
            const dataComic = comicResponse.data.results;
            cardsResponse = await getComics(methodComicIdCharacters);
            cardsResultados.innerHTML = "Characters";
            createComicInfo(dataComic[0]);
        }
        else {
            const methodCharacterId = `/${developerPass.get("id")}${inDeveloperPass}`;
            const methodCharacterIdComics = `/${developerPass.get("id")}/comics${inDeveloperPass}`;
            const characterResponse = await getCharacters(methodCharacterId);
            const dataCharacter = characterResponse.data.results;
            cardsResponse = await getCharacters(methodCharacterIdComics);
            cardsResultados.innerHTML = "Comics";
            createCharacterInfo(dataCharacter[0]);
        }
        cardsRelated(cardsResponse, developerPass.get("type"));
        disableButtons(cardsResponse);
    }
    catch (error) {
        console.log(error);
    }
};
createCardInfo();

const formSearch = document.getElementsByClassName("searchContainer")[0];
const search = (event) => {
    event.preventDefault();
    const formData = event.target;
    const developerPass = new URLSearchParams();
    developerPass.set('type', formData.type.value);
    if (formData.type.value === "comics") {
        developerPass.set('orderBy', "" + formData.orderComicsBy.value);
    }
    else {
        developerPass.set('orderBy', "" + formData.orderCharactersBy.value);
    }
    developerPass.set('searchTxt', "" + formData.searchTxt.value);
    developerPass.set('page', '1');
    window.location.href = "index.html?" + developerPass.toString();
};
formSearch.addEventListener('submit', search);


const filtros = async (offset, searchTxt, type, orderBy) => {
    let response = [];
    let inDeveloperPass = `?ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}&orderBy=${orderBy}`;
    try{
        if(searchTxt === "" || searchTxt === null){
            if(type === "comics"){
                response= await getComics(inDeveloperPass);
            }else{
                response = await getCharacters(inDeveloperPass);
            }    
        }else{
            if(type === "comics"){
                inDeveloperPass += `&titleStartsWith=${searchTxt}`
                response = await getComics(inDeveloperPass);
            }else{
                inDeveloperPass += `&nameStartsWith=${searchTxt}`
                response = await getCharacters(inDeveloperPass);
            }
        }
        createCards(response, type);
        disableButtons(response);
    }
    catch(error){
        console.log(error);
    }
}


const developerPass = new URLSearchParams(window.location.search);
    let searchTxt = developerPass.get("searchTxt");
    let type = developerPass.get("type");
    let orderBy = developerPass.get("orderBy");
    let offset = developerPass.get("offset");
if(window.location.search === ""){ 
    location.replace(`${window.location.pathname}?type=comics&orderBy=title&searchTxt=&page=1`);
    filtros(offset || "0", searchTxt || "", type || "comics", orderBy || "title");
} else {
    filtros(offset, searchTxt, type, orderBy);
}







